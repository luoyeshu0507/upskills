function Component() {}
Component.prototype.setState = function(state) {
  this.state = state;
  var oldEl = this.el;
  this.el = this._renderDom();
  if(this.onStateChange) this.onStateChange(oldEl, this.el);
}

Component.prototype.onStateChange = function(oldEl, newEl) {
  var parent = oldEl.parentNode;
  parent.insertBefore(newEl, oldEl);
  parent.removeChild(oldEl);
}

Component.prototype._renderDom = function() {
  this.el = this.createDomFromString(this.render());
  if (this.onClick) {
    this.el.addEventListener('click', this.onClick.bind(this), false)
  }
  return this.el;
}

Component.prototype.createDomFromString = function(str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  return div;
}

function LikeButton() {
  this.state = {
    isLiked: false
  }
}
LikeButton.prototype = new Component();
LikeButton.prototype.constructor = LikeButton;

LikeButton.prototype.render = function() {
  return `
    <button class='like-btn'>
      <span class='like-text'>${this.state.isLiked ? '取消' : '点赞'}</span>
      <span>👍</span>
    </button>
  `;
}
LikeButton.prototype.onClick = function() {
  this.setState({
    isLiked: !this.state.isLiked
  });
}

var list = document.querySelectorAll('like-button');
[].map.call(list, function(item) {
  var likeButton = new LikeButton();
  item.appendChild(likeButton._renderDom());
})