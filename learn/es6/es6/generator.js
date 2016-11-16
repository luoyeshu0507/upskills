function* helloworld() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

let he = helloworld();


let arr = [1, [[2, 3], 4], [5, 6]];
let flat = function* (a) {
	for (let i = 0, len = a.length; i < len; i++) {
		let item = a[i];
		if (typeof item !== 'number') {
			yield* flat(item);
		} else {
			yield item;
		}
	}
};

console.log([...flat(arr)]);
function* f() {
  for(var i=0; i < 10; i++) {
  	console.log(i, 'before');
    var reset = yield i;
  	console.log(i, 'after');
    if(reset) { i = -1; }
  }
}

var g = f();
console.log(g.next());
console.log(g.next());


function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}

console.log([...logReturned(genFuncWithReturn())]);

var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};

let c = clock();
console.log(c.next());
console.log(c.next());
console.log(c.next());
console.log(c.next());
console.log(c.next());



