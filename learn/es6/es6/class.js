class C1 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

var c1 = new C1('hello', 'world');
console.log('' + c1);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  sayx() {
  	console.log(this.x);
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color; // 正确
  }

  sayy () {
  	console.log(this.y);
  	super.sayx();
  	this.sayx();
  }

  sayx () {
  	console.log(this.x, 2);
  }
}

let p = new ColorPoint('x', 'y', 'red');
p.sayy();