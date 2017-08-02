function closeText() {
  var button = document.querySelector('.liveplayerToolBar-setting-enable.liveplayerToolBar-left');
  if (button) {
    button.click();
  } else {
    setTimeout(closeText, 100);
  }
}
if (location.pathname.match(/^\/\d+\/\d+/))
setTimeout(closeText, 100);