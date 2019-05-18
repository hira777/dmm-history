document.getElementById('goToHistory').addEventListener('click', () => {
  window.open(chrome.runtime.getURL('history.html'));
});
