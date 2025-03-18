# Sentinel
> Next Tech Lab

## Overview

**sentinel** is a repository containing Python and Next.js components designed to integrate GitHub repository analysis, semantic search, and AI-driven code reviews. The backend leverages Python libraries such as LangChain, Groq, Sentence Transformers, and FAISS for semantic indexing and retrieval. The frontend is built with Next.js, React, and Tailwind CSS.

---

## Repository Structure

```
spirizeon-sentinel/
├── README.md
├── requirements.txt
├── sentinel.py
└── frontend/
    ├── README.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── .gitignore
    ├── public/
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        │   ├── Gemini.tsx
        │   ├── Globe.tsx
        │   ├── Grid.tsx
        │   └── ui/
        │       ├── globe.tsx
        │       ├── google-gemini-effect.tsx
        │       └── layout-grid.tsx
        ├── data/
        │   ├── globe.json
        │   └── music_courses.json
        └── lib/
            └── utils.ts
```

---

## Backend (Python)

### **Main Components:**

- **sentinel.py**: Core Python script responsible for fetching GitHub repositories, embedding files using Sentence Transformers, indexing embeddings with FAISS, and generating AI-driven code reviews using LangChain and Groq.

### **Key Functionalities:**

- **GitHub Integration**: Fetches repository files and pull requests using PyGithub.
- **Semantic Search**: Embeds file contents into vector representations using Sentence Transformers (`all-MiniLM-L6-v2`) and indexes them with FAISS.
- **AI-driven Reviews**: Generates constructive feedback on code quality, readability, optimization opportunities, robustness, security issues, and best practices using LangChain with Groq's `mixtral-8x7b-32768` model.

### **Important Functions:**

| Function Name                  | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| `fetch_github_repo_files`      | Retrieves files from a specified GitHub repository.                  |
| `update_rag_index`             | Updates the FAISS index with embeddings of the latest repository files. |
| `search_faiss`                 | Performs semantic search within the indexed embeddings.              |
| `generate_response`            | Generates AI-driven responses based on user queries and context.     |
| `process_github_repo`          | Processes a GitHub repository to answer user queries.                |
| `process_pull_request`         | Automatically generates review comments for open pull requests.      |

### **Dependencies (requirements.txt):**
Key libraries include:
- LangChain ecosystem (`langchain`, `langchain-core`, `langchain-community`, `langchain-groq`)
- Groq API (`groq`)
- Sentence Transformers (`sentence-transformers`)
- FAISS (`faiss-cpu`)
- PyGithub (`PyGithub`)
- Flask (for potential API development)
- numpy, requests, python-dotenv

---

## Frontend (Next.js)

The frontend is built with Next.js 15.x and React 19.x, styled using Tailwind CSS.

### **Main Components:**

- **Gemini.tsx**, **Globe.tsx**, **Grid.tsx**: UI components for interactive visualizations.
- **Layout Components**: Define global styles and page layouts.

### **Project Setup:**

To run the frontend locally:

```bash
npm install

npm run dev # or yarn dev / pnpm dev / bun dev
```

Visit `http://localhost:3000` to view the application.

### **Dependencies (package.json):**
Key dependencies include:
- Next.js 15.x (`next`)
- React 19.x (`react`, `react-dom`)
- Three.js ecosystem (`three`, `@react-three/fiber`, `@react-three/drei`)
- Tailwind CSS (`tailwindcss`, `@tailwindcss/postcss`)
- Radix UI components (`@radix-ui/react-hover-card`)
- ESLint for code quality enforcement

---

## Usage Examples

### **Process Repository Query (Python Backend)**

```python
repo_name = 'Spirizeon/claxvim'
user_query = "What improvements can be made to error handling?"
result = process_github_repo(repo_name, user_query)

print(f"Query: {result['query']}")
print(f"Relevant files: {result['relevant_files']}")
print(f"Response: {result['response']}")
```

### **Review Open Pull Requests (Python Backend)**

```python
open_prs = get_open_pr_numbers("spirizeon", "claxvim")

if not open_prs:
    print("Nothing to review!")

for pr_number in open_prs:
    pr_result = process_pull_request('Spirizeon/claxvim', pr_number)
    print(f"PR Review Status: {pr_result['status']}")
    if 'review' in pr_result:
        print(f"Review Comments:\n{pr_result['review']}")
```

---

## Deployment

The frontend can be easily deployed on Vercel:

1. Connect your GitHub repository to Vercel.
2. Configure build commands as per Next.js defaults.
3. Deploy directly from the Vercel dashboard.

For backend deployment:
- Containerize the Python backend using Docker.
- Deploy on cloud platforms like AWS ECS, Google Cloud Run, or Azure Container Instances.

---

## Contribution Guidelines

To contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push your branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request on GitHub.

---

## License

This project is licensed under the MIT License.
