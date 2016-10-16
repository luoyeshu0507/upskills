'use strict';

function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.x = x;
  this.y = y;
}

var p = new Point();
p; // { x: 0, y: 0 }

function fetch(url, _ref) {
  var _ref$body = _ref.body;
  var body = _ref$body === undefined ? '' : _ref$body;
  var _ref$method = _ref.method;
  var method = _ref$method === undefined ? 'GET' : _ref$method;
  var _ref$headers = _ref.headers;
  var headers = _ref$headers === undefined ? {} : _ref$headers;

  console.log(method);
}

fetch('http://example.com', {});
// "GET"

fetch('http://example.com');
// 报错