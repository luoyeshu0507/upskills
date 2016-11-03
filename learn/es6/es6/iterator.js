console.time('hh');
let it = makeIterator(['a', 'b']);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function makeIterator(arr) {
	let nextIndex = 0;
	return {
		next: function() {
			return nextIndex < arr.length ?
				{value: arr[nextIndex++], done: false} :
				{value: undefined, done: true}
		}
	}
}
console.timeEnd('hh');

let arr = 'abcdfabcdfabcdfabcdfabcdfabcdfabcdfabcdfabcdf';

let generator = function* () {
  yield 1;
  yield* Array.from(arr);
  yield 5;
};

var iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

