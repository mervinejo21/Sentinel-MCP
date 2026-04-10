
````markdown
# 🛡️ Sentinel-MCP
### Autonomous AI Compliance Auditor

**Sentinel-MCP** is a full-stack AI application designed to demonstrate the power of the **Model Context Protocol (MCP)** in enterprise security. It features a **LangGraph** ReAct agent that autonomously audits user content by connecting to a custom-built MCP security server.

## 🏗️ System Architecture

- **Frontend:** Next.js 15 (App Router, Tailwind CSS v4, TypeScript)
- **API Layer:** FastAPI (Python) serving as the bridge between Web and AI logic.
- **AI Orchestration:** LangGraph implementing a ReAct (Reasoning + Acting) loop.
- **Model:** Mistral Large 3 (via Mistral AI)
- **Protocol:** Model Context Protocol (MCP) for secure tool-calling.

## 🛠️ Installation & Setup

### 1. Prerequisites
- **Python 3.12+** (Managed via [uv](https://github.com/astral-sh/uv))
- **Node.js v20+**
- **Mistral AI API Key**

### 2. Backend Installation
From the root directory (`Sentinel-MCP`):

```powershell
# Install Python dependencies
uv sync

# Create your environment configuration
# Open .env and add your MISTRAL_API_KEY
echo "MISTRAL_API_KEY=your_actual_key_here" > .env
````

### 3\. Frontend Installation

Navigate to the UI directory:

```powershell
cd ui
npm install
```

## 🚥 running the Application

You must have **two separate terminals** running:

#### Terminal A: AI Agent Service (Backend)

```powershell
# From the root directory
uv run api.py
```

#### Terminal B: Web Dashboard (Frontend)

```powershell
# From the /ui directory
npm run dev
```

The application will be available at: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

## 🛡️ Security Capabilities

The system utilizes a custom MCP Server (`server.py`) to execute local security logic that never leaves your infrastructure:

  - **PII Detection:** Identifies potentially sensitive personal information.
  - **Credential Scanning:** Detects hardcoded passwords and secrets using pattern matching.
  - **Autonomous Reasoning:** The AI agent only triggers these tools when it perceives a potential compliance risk in the user's input.

## 📁 Project Structure

  - `/ui`: Next.js frontend application.
  - `server.py`: The MCP Server defining security tools.
  - `orchestrator.py`: The LangGraph agent logic.
  - `api.py`: FastAPI server for frontend-backend communication.
  - `.env`: Environment secrets (not tracked by git).

```
```