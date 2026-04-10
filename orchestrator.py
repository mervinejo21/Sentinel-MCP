import asyncio
import os
from mcp import StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp import ClientSession
from langchain_mcp_adapters.tools import load_mcp_tools
from langgraph.prebuilt import create_react_agent
from langchain_mistralai import ChatMistralAI
from dotenv import load_dotenv

load_dotenv()

# We wrap the logic here so api.py can find it
async def run_security_audit(user_input: str):
    if not os.getenv("MISTRAL_API_KEY"):
        return "Error: MISTRAL_API_KEY is missing."

    server_params = StdioServerParameters(command="python", args=["server.py"])

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # 1. Load and Fix Tools
            tools = await load_mcp_tools(session)
            for tool in tools:
                tool.response_format = "content" 

            # 2. Setup Agent
            model = ChatMistralAI(model="mistral-large-latest")
            agent = create_react_agent(model, tools)

            # 3. Run the audit
            inputs = {"messages": [("user", user_input)]}
            response = await agent.ainvoke(inputs)
            
            # Return only the final text message
            return response["messages"][-1].content

# This part keeps your manual testing working
if __name__ == "__main__":
    test_input = "Check if 'My password is 123' is safe."
    result = asyncio.run(run_security_audit(test_input))
    print(f"Test Result: {result}")