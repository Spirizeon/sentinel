import os
from github import Github
import base64
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import groq
from langchain_groq import ChatGroq
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ["LANGCHAIN_TRACING_V2"] = os.getenv("LANGCHAIN_TRACING_V2", "true")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")

# Initialize GitHub client
g = Github(os.getenv("GITHUB_TOKEN"))

# Initialize Groq client with LangChain
llm = ChatGroq(
    model="mixtral-8x7b-32768", 
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.5
)
parser = StrOutputParser()
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize FAISS index and file tracking
dimension = 384
index = faiss.IndexFlatL2(dimension)
file_paths = []
repo_files = {}

system_prompt = """
You are an expert software engineer and code reviewer. Your objective is to provide focused, constructive feedback on code, emphasizing best practices, readability, efficiency, and security. Prioritize concise, actionable suggestions.

- Structure: Evaluate code organization, logic flow, and modularity.
- Readability: Assess naming conventions, inline comments, and clarity.
- Optimization: Identify areas for performance improvement, reducing unnecessary computations or memory usage.
- Robustness: Verify error handling and edge-case coverage.
- Security: Flag vulnerabilities, such as unsafe data handling or injection risks.
- Best Practices: Ensure adherence to language or framework-specific guidelines.

When suggesting changes, list each on a new line for readability, formatted as: Suggestion 1 /n Suggestion 2 /n Suggestion 3. Avoid generic feedback; be as specific as possible and use examples where helpful.

Summary: Provide a brief overview of strengths and areas for improvement.
"""

prompt_template = PromptTemplate(
    input_variables=["system_prompt", "context", "query"],
    template="{system_prompt}\n\nHere are some relevant files: {context}\n\nUser's question: {query}\nAnswer:",
)

def fetch_github_repo_files(repo_name):
    repo = g.get_repo(repo_name)
    contents = repo.get_contents("")
    files = {}

    while contents:
        file_content = contents.pop(0)
        if file_content.type == "dir":
            contents.extend(repo.get_contents(file_content.path))
        else:
            try:
                file_data = base64.b64decode(file_content.content).decode("utf-8")
                files[file_content.path] = file_data
            except (UnicodeDecodeError, base64.binascii.Error):
                print(f"Skipping binary file: {file_content.path}")
                continue
    return files

def update_rag_index(repo_name):
    global index, file_paths, repo_files
    index.reset()
    file_paths.clear()
    repo_files = fetch_github_repo_files(repo_name)

    for path, content in repo_files.items():
        embedding = embed_text_with_transformers(content)
        index.add(np.array([embedding], dtype=np.float32))
        file_paths.append(path)

    print(f"Indexed to new RAG {len(file_paths)} files from {repo_name}.")

def embed_text_with_transformers(text):
    return embedder.encode(text)

def search_faiss(query, top_k=3):
    query_embedding = embed_text_with_transformers(query)
    query_embedding = np.array([query_embedding], dtype=np.float32)
    distances, indices = index.search(query_embedding, top_k)
    relevant_files = [file_paths[i] for i in indices[0] if i < len(file_paths)]
    return relevant_files

def fetch_file_content(file_paths, repo_files):
    return "\n\n".join([repo_files[file] for file in file_paths if file in repo_files])

def generate_response(query, context):
    prompt = prompt_template.format(system_prompt=system_prompt, context=context, query=query)
    chain = llm | parser
    response = chain.invoke(prompt)
    return response

def process_github_repo(repo_name, user_query):
    # Ensure the index is up to date
    update_rag_index(repo_name)

    # Retrieve relevant files and their content
    relevant_files = search_faiss(user_query, top_k=3)
    relevant_files_content = fetch_file_content(relevant_files, repo_files)

    # Generate response from the model
    response = generate_response(user_query, relevant_files_content)
    
    return {
        "query": user_query,
        "repo": repo_name,
        "relevant_files": relevant_files,
        "response": response
    }

def process_pull_request(repo_name, pr_number):
    # Update the RAG index with the repository content
    update_rag_index(repo_name)
    
    # Get the pull request object
    repo = g.get_repo(repo_name)
    pull_request = repo.get_pull(pr_number)
    
    comments = []
    for file in pull_request.get_files():
        file_path = file.filename
        if file_path in repo_files:
            relevant_files_content = repo_files[file_path]
            review_comment = generate_response(f"Review the file: {file_path}", relevant_files_content)
            comments.append(f"**{file_path}**\n{review_comment}")
    
    review_body = "\n\n".join(comments)
    
    try:
        pull_request.create_review(
            body=review_body if review_body else "Automated code review feedback",
            event="COMMENT"
        )
        return {"status": "Review comments added", "review": review_body}
    except Exception as e:
        print(f"Error creating review: {e}")
        return {"status": "Error creating review", "error": str(e)}

# Example usage:
if __name__ == '__main__':
    # Example 1: Process a repository with a query
    repo_name = 'Spirizeon/claxvim'  # Default repository
    user_query = "What improvements can be made to error handling?"
    result = process_github_repo(repo_name, user_query)
    print(f"Query: {result['query']}")
    print(f"Relevant files: {result['relevant_files']}")
    print(f"Response: {result['response']}")
    
    # Example 2: Process a pull request
    # pr_result = process_pull_request('Spirizeon/claxvim', 1)
    # print(f"PR Review Status: {pr_result['status']}")
    # if 'review' in pr_result:
    #     print(f"Review: {pr_result['review']}")