"use client";
import { useState } from "react";

export default function SentinelDashboard() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    try {
      // This will talk to your FastAPI server on port 8000
      const res = await fetch("http://localhost:8000/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      setResult(data.result || data.detail);
    } catch (err) {
      setResult("❌ Failed to connect to Sentinel Backend. Ensure api.py is running.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-blue-500">
              SENTINEL<span className="text-slate-500">.MCP</span>
            </h1>
            <p className="text-slate-400 text-sm">Autonomous Compliance & Security Auditor</p>
          </div>
          <div className="hidden md:block px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono">
            SYSTEM ONLINE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-xl">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                Input Stream
              </label>
              <textarea 
                className="w-full h-64 bg-slate-950/50 border border-slate-700 rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Paste code, logs, or messages to audit..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button 
                onClick={handleAudit}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
              >
                {loading ? "PROCESSING..." : "EXECUTE SECURITY AUDIT"}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-full min-h-[400px]">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                Audit Findings
              </label>
              
              {result ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className={`p-4 rounded-lg border font-mono text-sm ${
                    result.includes("FAILED") || result.includes("Sensitive") 
                    ? "bg-red-500/10 border-red-500/50 text-red-400" 
                    : "bg-green-500/10 border-green-500/50 text-green-400"
                  }`}>
                    {result}
                  </div>
                  <p className="mt-4 text-xs text-slate-500 italic">
                    Timestamp: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                  <p className="text-sm">Waiting for input...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}