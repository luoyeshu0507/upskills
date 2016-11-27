function A (name) {
	this.name = name;
}
function B (name) {
	A.call(this, name);
}
B.prototype = new A();
B.prototype.contructor = B;

function C (name) {
	B.call(this, name);
}
C.prototype = new B();
C.prototype.contructor = C;

var a = new A('A');
var b = new B('B');
var c = new C('C');
