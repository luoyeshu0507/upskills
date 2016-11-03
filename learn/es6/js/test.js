'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = function () {
	(0, _createClass3.default)(Person, [{
		key: 'sayHello',
		value: function sayHello() {
			console.log('hello');
		}
	}]);

	function Person() {
		(0, _classCallCheck3.default)(this, Person);

		this.name = 1;
	}

	return Person;
}();