'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _class, _dec, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(target) {
	target.isTestable = true;
}

var myClass = test(_class = function myClass() {
	(0, _classCallCheck3.default)(this, myClass);
}) || _class;

console.log(myClass.isTestable);

function test2(isTestable) {
	return function (target) {
		target.isTestable = isTestable;
	};
}

var myClass2 = (_dec = test2('xx'), _dec(_class2 = function myClass2() {
	(0, _classCallCheck3.default)(this, myClass2);
}) || _class2);


console.log(myClass2.isTestable);