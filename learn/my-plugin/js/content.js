document.querySelector('body').addEventListener('dblclick', e => {
  console.log('content clicked');
  chrome.runtime.sendMessage({
    key: 'content message'
  }, res => {
    console.log(res);
  })
});
