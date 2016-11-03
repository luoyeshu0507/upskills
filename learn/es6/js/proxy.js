"use strict";

var _set = require("babel-runtime/core-js/reflect/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("babel-runtime/core-js/reflect/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj = new Proxy({}, {
  get: function get(target, key, receiver) {
    console.log("getting " + key + "!");
    return (0, _get2.default)(target, key, receiver);
  },
  set: function set(target, key, value, receiver) {
    console.log("setting " + key + "!");
    return (0, _set2.default)(target, key, value, receiver);
  }
});

obj.count = 1;
++obj.count;