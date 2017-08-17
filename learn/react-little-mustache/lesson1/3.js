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
      <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
      <span>👍</span>
    </button>
  `);
  var self = this;
  this.el.addEventListener('click', this.changeLikeText.bind(this), false);
  return this.el;
}
LikeButton.prototype.changeLikeText = function() {
  this.setState({
    isLiked: !this.state.isLiked
  });
}
LikeButton.prototype.setState = function(state) {
  this.state = state;
  var oldEl = this.el;
  this.el = this.render();
  if(this.onStateChange) this.onStateChange(oldEl, this.el);
}

var list = document.querySelectorAll('like-button');
[].map.call(list, function(item) {
  var likeButton = new LikeButton();
  item.appendChild(likeButton.render());
  likeButton.onStateChange = function(oldEl, newEl) {
    item.insertBefore(newEl, oldEl);
    item.removeChild(oldEl);
  }
})