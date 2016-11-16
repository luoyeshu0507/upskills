class A{

}

class B extends A{
	constructor() {
		super();
		console.log(this);
	}
}

let b = new B();