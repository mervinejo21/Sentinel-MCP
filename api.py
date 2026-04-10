print("--- API STARTING ---")
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os

# Import your function
try:
    from orchestrator import run_security_audit
    print("--- ORCHESTRATOR IMPORTED ---")
except ImportError as e:
    print(f"--- IMPORT ERROR: {e} ---")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Temporarily allow everything to test connectivity
    allow_methods=["*"],
    allow_headers=["*"],
)

class AuditRequest(BaseModel):
    content: str

@app.post("/audit")
async def audit_content(request: AuditRequest):
    print(f"Received request: {request.content}")
    try:
        result = await run_security_audit(request.content)
        return {"status": "success", "result": result}
    except Exception as e:
        print(f"Error during audit: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Sentinel API is Online"}

if __name__ == "__main__":
    print("--- STARTING UVICORN ---")
    uvicorn.run(app, host="127.0.0.1", port=8000)