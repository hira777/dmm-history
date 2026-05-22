const goToHistoryElement = document.getElementById('goToHistory');

if (goToHistoryElement) {
  goToHistoryElement.addEventListener('click', () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL('history.html')
    });
  });
}
