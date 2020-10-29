const changeBlur = document.getElementById('changeBlur');

chrome.storage.sync.get('hide', function (data) {
  changeBlur.checked = data.hide;
});

changeBlur.onchange = function (element) {
  let value = this.checked;

  chrome.storage.sync.set({ hide: value }, function () {
    console.log('this values is + ' + value);
  });

  if (value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'init', hide: value },
        function (response) {
          console.log(response.result);
        }
      );
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'remove', hide: value },
        function (response) {
          console.log(response.result);
        }
      );
    });
  }
};
