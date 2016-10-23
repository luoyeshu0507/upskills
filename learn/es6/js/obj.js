'use strict';

var _car;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var car = (_car = {}, _defineProperty(_car, foo, 'name'), _defineProperty(_car, 'a' + 'b', 'ab'), _car);

console.log(car);

Object.getOwnPropertyDescriptor(person);