document.addEventListener('click', function(event) {
  let target = event.target;
  while (target && target.tagName !== 'A') {
    target = target.parentElement;
  }
  if (target && target.tagName === 'A') {
    event.preventDefault();
    const link = target.href;

    // Send the phishing check message
    chrome.runtime.sendMessage({ action: "checkPhishing", link: link });

    // Navigate to the link immediately
    window.location.href = link;
  }
}, true);
