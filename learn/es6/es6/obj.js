let foo = 'abc';
let a = {foo};

let hh = (x, y) => ({x, y});

let person = {
	name: 'zhangsan',
	foo,
	hello() {
		console.log(1);
	}
};

var cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}

var car = {
	[foo]: 'name',
	['a' + 'b']: 'ab'
};

console.log(car);

Object.getOwnPropertyDescriptor(person);

