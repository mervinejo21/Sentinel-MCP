document.getElementById('scanBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.innerText = "🔍 Fetching draft...";

  // 1. Get text from the current page
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "getText" }, async (response) => {
    if (!response || !response.text) {
      status.innerText = "❌ No text area found.";
      return;
    }

    status.innerText = "🧠 AI is thinking...";

    // 2. Send text to your FastAPI backend
    try {
      const apiResponse = await fetch('http://127.0.0.1:8000/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: response.text })
      });
      const data = await apiResponse.json();
      
      // 3. Display the AI's answer
      status.innerText = "✅ Result: " + (data.analysis || data.response || JSON.stringify(data));
    } catch (error) {
      status.innerText = "❌ Backend connection failed.";
    }
  });
});