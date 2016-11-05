describe('first test', function () {
	var count = 0;

	beforeEach(function () {
		count = 0;
	});

	it('increments value', function () {
		count++;
		expect(count).toEqual(1);
	});

	it('decrements value', function () {
		count--;
		expect(count).toEqual(-1);
	});

	it('test plus', function () {
		expect(1 + 1).toEqual(2);
	});

});