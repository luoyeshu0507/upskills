// default paragrames
function log(z, x = 10, y) {
    console.log(x);
}

console.log(log.length)

// 结构
function foo({x, y = 5}) {
    console.log(x, y);
}

foo({});

function foo1(...args) {
    console.log(args);
}

foo1(1, 2, 3);

var f = x => x * x;

