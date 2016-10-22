"use strict";

// default paragrames
function log(z) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var y = arguments[2];

    console.log(x);
}

console.log(log.length);

// 结构
function foo(_ref) {
    var x = _ref.x;
    var _ref$y = _ref.y;
    var y = _ref$y === undefined ? 5 : _ref$y;

    console.log(x, y);
}

foo({});

function foo1() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    console.log(args);
}

foo1(1, 2, 3);

var f = function f(x) {
    return x * x;
};