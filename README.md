![image](https://github.com/user-attachments/assets/962c9b4e-e7c1-4328-8765-828cee0b1a1a)
<div align="center">
🤖 Automated GitHub Pull Request Reviewer


</div>
🌐 Real-time, AI-driven PR feedback for code quality, readability, and optimization.
🚀 Project Inspiration
With the increasing demand for high-quality code reviews, maintaining consistency and depth in reviewing becomes challenging. This project automates PR reviews using AI to provide constructive feedback, covering essential aspects of code quality, structure, and maintainability—helping developers save time while ensuring code integrity.

🔍 Key Features
Intelligent PR Feedback: Provides automated feedback on:
Code structure, readability, and optimization
Robust error handling and security vulnerabilities
Best practices tailored to the language or framework in use
Machine Learning-Powered Analysis: Embeds file content using Sentence Transformers and indexes them with FAISS for efficient, content-based retrieval.
Real-time Suggestions: Generates and posts feedback within seconds, offering constructive advice in concise comments.
GitHub Integration: Leverages GitHub API to directly comment on PRs and handle webhooks for seamless updates.
🛠️ Tech Stack

Frontend: Commenting directly on GitHub PRs.
Backend: Flask app for managing webhook events and API interactions.
NLP Model: Sentence Transformers for embedding code context.
Indexing: FAISS for vector search and retrieval.
Language Processing: Cohere’s LLM via LangChain for advanced text analysis.
Environment Management: Dotenv for sensitive environment variables.
🧭 Workflow
PR Trigger: When a PR is opened, ready for review, or updated, GitHub sends a webhook to the app.
Embedding and Indexing: The code embeds the file content, indexes it, and identifies related files.
AI-Powered Feedback: The app generates structured feedback focused on code readability, performance, and best practices.
Automated Commenting: Posts feedback as inline comments on the PR, making review insights accessible.

