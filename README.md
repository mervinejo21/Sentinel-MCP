🛡️ Sentinel-MCP
Autonomous AI Compliance Auditor
Sentinel-MCP is a full-stack AI application that leverages the Model Context Protocol (MCP) to audit sensitive data. It uses a LangGraph ReAct agent to autonomously decide when to trigger security scans via a custom-built MCP server, providing real-time compliance feedback through a modern Next.js dashboard.

🚀 Technical Stack
AI Orchestration: LangGraph (Python)

Model: Mistral Large 3 (via Mistral AI API)

Protocol: Model Context Protocol (MCP)

Backend: FastAPI (Python)

Frontend: Next.js 15 (Tailwind CSS v4, TypeScript)

Environment: uv (Fast Python package manager)

🏗️ Architecture
Next.js UI: A high-end cybersecurity dashboard for user interaction.

FastAPI Bridge: Handles requests and streams agentic thoughts to the frontend.

LangGraph Agent: A ReAct agent that evaluates content and determines if the check_compliance tool is required.

Sentinel MCP Server: A specialized server that implements local security rules and logic, exposed via the Model Context Protocol.

🛠️ Installation & Setup
1. Prerequisites
Ensure you have uv installed (modern Python manager) and Node.js (v20+).

2. Backend Setup
PowerShell
# Clone the repository
git clone https://github.com/your-username/Sentinel-MCP.git
cd Sentinel-MCP

# Create environment and install dependencies
uv sync

# Setup Environment Variables
# Create a .env file and add:
MISTRAL_API_KEY=your_api_key_here
3. Frontend Setup
PowerShell
cd ui
npm install
🚥 Running the Application
You will need two terminal sessions:

Terminal A (Python API):

PowerShell
uv run api.py
Terminal B (Next.js Dashboard):

PowerShell
cd ui
npm run dev
Visit http://localhost:3000 to access the dashboard.

🛡️ Security Logic
The Sentinel MCP server currently monitors for:

Hardcoded Passwords: Detects common sensitive strings.

GDPR Compliance: Flags potential PII (Personally Identifiable Information).

Pattern Matching: Uses regex to identify high-risk data leaks before they reach the LLM.