chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkPhishing") {
    fetch(`http://localhost:5000/checkPhishingSite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ link: message.link })
    })
      .then(response => response.json())
      .then(data => {
        if (data.phishingScore >= 8) {
          chrome.action.setIcon({ path: "alert_icon.png" });
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'alert_icon.png',
            title: 'Phishing Alert',
            message: `Warning: This site might be a phishing site. Reason: ${data.reason}`
          });
        } else {
          chrome.action.setIcon({ path: "icon128.png" });
        }
        sendResponse(data);
      })
      .catch(error => {
        chrome.action.setIcon({ path: "icon128.png" });
        sendResponse({ error: "Failed to check phishing site" });
      });
    return true;  // Will respond asynchronously.
  }
});
