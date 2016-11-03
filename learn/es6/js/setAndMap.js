"use strict";

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var set = new _set2.default([1, 2, 3, 4, 5, 5]);
console.log([].concat((0, _toConsumableArray3.default)(set)));