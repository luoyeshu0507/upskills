'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [helloworld, f, genFuncWithReturn, logReturned].map(_regenerator2.default.mark);

function helloworld() {
  return _regenerator2.default.wrap(function helloworld$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return 'world';

        case 4:
          return _context.abrupt('return', 'ending');

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

var he = helloworld();

var arr = [1, [[2, 3], 4], [5, 6]];
var flat = _regenerator2.default.mark(function flat(a) {
  var i, len, item;
  return _regenerator2.default.wrap(function flat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          i = 0, len = a.length;

        case 1:
          if (!(i < len)) {
            _context2.next = 12;
            break;
          }

          item = a[i];

          if (!(typeof item !== 'number')) {
            _context2.next = 7;
            break;
          }

          return _context2.delegateYield(flat(item), 't0', 5);

        case 5:
          _context2.next = 9;
          break;

        case 7:
          _context2.next = 9;
          return item;

        case 9:
          i++;
          _context2.next = 1;
          break;

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, flat, this);
});

console.log([].concat((0, _toConsumableArray3.default)(flat(arr))));
function f() {
  var i, reset;
  return _regenerator2.default.wrap(function f$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < 10)) {
            _context3.next = 11;
            break;
          }

          console.log(i, 'before');
          _context3.next = 5;
          return i;

        case 5:
          reset = _context3.sent;

          console.log(i, 'after');
          if (reset) {
            i = -1;
          }

        case 8:
          i++;
          _context3.next = 1;
          break;

        case 11:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[1], this);
}

var g = f();
console.log(g.next());
console.log(g.next());

function genFuncWithReturn() {
  return _regenerator2.default.wrap(function genFuncWithReturn$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return 'a';

        case 2:
          _context4.next = 4;
          return 'b';

        case 4:
          return _context4.abrupt('return', 'The result');

        case 5:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[2], this);
}
function logReturned(genObj) {
  var result;
  return _regenerator2.default.wrap(function logReturned$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.delegateYield(genObj, 't0', 1);

        case 1:
          result = _context5.t0;

          console.log(result);

        case 3:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[3], this);
}

console.log([].concat((0, _toConsumableArray3.default)(logReturned(genFuncWithReturn()))));

var clock = _regenerator2.default.mark(function clock() {
  return _regenerator2.default.wrap(function clock$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 9;
            break;
          }

          console.log('Tick!');
          _context6.next = 4;
          return;

        case 4:
          console.log('Tock!');
          _context6.next = 7;
          return;

        case 7:
          _context6.next = 0;
          break;

        case 9:
        case 'end':
          return _context6.stop();
      }
    }
  }, clock, this);
});

var c = clock();
console.log(c.next());
console.log(c.next());
console.log(c.next());
console.log(c.next());
console.log(c.next());