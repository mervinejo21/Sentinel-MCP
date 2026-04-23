/** * DRAFTSAFE - BULLETPROOF CONTENT SCRIPT
 */

console.log("🛡️ DraftSafe: Content Script Loaded & Watching...");

async function performAudit(text) {
    if (!text || text.trim().length < 3) return;

    console.log("🧠 Sending to AI:", text);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text }) 
        });

        const data = await response.json();
        console.log("✅ AI Response received:", data);

        // MATCHING YOUR LOG: Use data.result instead of data.response
        const feedback = data.result; 

        if (feedback) {
            // Force an alert to show up
            showToast("🛡️ DRAFTSAFE AUDIT:\n\n" + feedback);
        }
    } catch (error) {
        console.error("❌ DraftSafe: Connection failed", error);
    }
}

// Listen for paste on the entire window (more reliable for Gmail)
window.addEventListener('paste', (event) => {
    console.log("📋 Paste detected!");
    
    // Get text from clipboard
    const pastedText = (event.clipboardData || window.clipboardData).getData('text');
    
    if (pastedText) {
        performAudit(pastedText);
    }
}, true); // The 'true' here helps capture the event before Gmail's internal scripts


function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #7c3aed;
        color: white;
        padding: 16px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        font-family: sans-serif;
        max-width: 300px;
        border-left: 5px solid #a855f7;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 5000); // Disappears after 5 seconds
}

// In performAudit, replace alert(feedback) with:
// showToast("⚠️ " + feedback);