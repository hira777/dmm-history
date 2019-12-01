(document.getElementById('goToHistory') as HTMLElement).addEventListener(
  'click',
  () => {
    window.open(chrome.runtime.getURL('history.html'));
  }
);
