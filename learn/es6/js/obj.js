'use strict';

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _car;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var foo = 'abc';
var a = { foo: foo };

var hh = function hh(x, y) {
  return { x: x, y: y };
};

var person = {
  name: 'zhangsan',
  foo: foo,
  hello: function hello() {
    console.log(1);
  }
};

var cart = {
  _wheels: 4,

  get wheels() {
    return this._wheels;
  },

  set wheels(value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
};

var car = (_car = {}, (0, _defineProperty3.default)(_car, foo, 'name'), (0, _defineProperty3.default)(_car, 'a' + 'b', 'ab'), _car);

console.log(car);

(0, _getOwnPropertyDescriptor2.default)(person);