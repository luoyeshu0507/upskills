'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.time('hh');
var it = makeIterator(['a', 'b']);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function makeIterator(arr) {
	var nextIndex = 0;
	return {
		next: function next() {
			return nextIndex < arr.length ? { value: arr[nextIndex++], done: false } : { value: undefined, done: true };
		}
	};
}
console.timeEnd('hh');

var arr = 'abcdfabcdfabcdfabcdfabcdfabcdfabcdfabcdfabcdf';

var generator = _regenerator2.default.mark(function generator() {
	return _regenerator2.default.wrap(function generator$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					_context.next = 2;
					return 1;

				case 2:
					return _context.delegateYield((0, _from2.default)(arr), 't0', 3);

				case 3:
					_context.next = 5;
					return 5;

				case 5:
				case 'end':
					return _context.stop();
			}
		}
	}, generator, this);
});

var iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());