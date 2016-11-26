'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C1 = function () {
  function C1(x, y) {
    (0, _classCallCheck3.default)(this, C1);

    this.x = x;
    this.y = y;
  }

  (0, _createClass3.default)(C1, [{
    key: 'toString',
    value: function toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }]);
  return C1;
}();

var c1 = new C1('hello', 'world');
console.log('' + c1);

var Point = function () {
  function Point(x, y) {
    (0, _classCallCheck3.default)(this, Point);

    this.x = x;
    this.y = y;
  }

  (0, _createClass3.default)(Point, [{
    key: 'sayx',
    value: function sayx() {
      console.log(this.x);
    }
  }]);
  return Point;
}();

var ColorPoint = function (_Point) {
  (0, _inherits3.default)(ColorPoint, _Point);

  function ColorPoint(x, y, color) {
    (0, _classCallCheck3.default)(this, ColorPoint);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ColorPoint.__proto__ || (0, _getPrototypeOf2.default)(ColorPoint)).call(this, x, y));

    _this.color = color; // 正确
    return _this;
  }

  (0, _createClass3.default)(ColorPoint, [{
    key: 'sayy',
    value: function sayy() {
      console.log(this.y);
      (0, _get3.default)(ColorPoint.prototype.__proto__ || (0, _getPrototypeOf2.default)(ColorPoint.prototype), 'sayx', this).call(this);
      this.sayx();
    }
  }, {
    key: 'sayx',
    value: function sayx() {
      console.log(this.x, 2);
    }
  }]);
  return ColorPoint;
}(Point);

var p = new ColorPoint('x', 'y', 'red');
p.sayy();