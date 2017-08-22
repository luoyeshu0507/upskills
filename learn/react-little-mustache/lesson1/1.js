var button = document.querySelector('.like-btn');
var text = document.querySelector('.like-text');
var isLiked = false;
button.addEventListener('click', function() {
  isLiked = !isLiked;
  if (isLiked) {
    text.innerHTML = '取消';
  } else {
    text.innerHTML = '点赞';
  }
}, false)