chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === 'init') {
    addListeners();
  } else {
    removeListeners();
  }
  sendResponse({ result: 'success' });
});

window.onload = function () {
  chrome.storage.sync.get('hide', function (data) {
    if (data.hide) {
      addListeners();
    } else {
      removeListeners();
    }
  });
};
