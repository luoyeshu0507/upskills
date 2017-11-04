function closeText() {
  var button = document.querySelector('.liveplayerToolBar-damuBtn a');
  if (button) {
    setTimeout(function (){
      button.click();
    }, 1000);
  } else {
    setTimeout(closeText, 100);
  }
}
if (location.pathname.match(/^\/\d+\/\d+/))
setTimeout(closeText, 100);