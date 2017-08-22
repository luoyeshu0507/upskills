function LikeButton() {
  this.state = {
    isLiked: false
  }
}
LikeButton.prototype.createDomFromString = function(str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  return div;
}
LikeButton.prototype.render = function() {
  this.el = this.createDomFromString(`
    <button class='like-btn'>
      <span class='like-text'>点赞</span>
      <span>👍</span>
    </button>
  `);
  var self = this;
  this.el.addEventListener('click', this.changeLikeText.bind(this), false);
  return this.el;
}
LikeButton.prototype.changeLikeText = function() {
  var likeText = this.el.querySelector('.like-text');
  this.state.isLiked = !this.state.isLiked;
  likeText.innerHTML = this.state.isLiked ? '取消' : '点赞';
}

var list = document.querySelectorAll('like-button');
[].map.call(list, function(item) {
  item.appendChild(new LikeButton().render());
})