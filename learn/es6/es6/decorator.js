function test(target) {
	target.isTestable = true;
}

@test
class myClass {}

console.log(myClass.isTestable);

function test2(isTestable) {
	return function(target) {
		target.isTestable = isTestable;
	}
}

@test2('xx')
class myClass2 {}

console.log(myClass2.isTestable);