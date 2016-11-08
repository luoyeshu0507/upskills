describe('controller test', function() {
	var mockScope = {};
	var controller;
	beforeEach(angular.mock.module('exampleApp'));
	
	beforeEach(angular.mock.inject(function($httpBackend) {
		backend = $httpBackend;
		backend.expect('GET', 'product.json').respond({
			"data":[
				{
					"id": "123",
					"name": "lzw",
					"age": 10
				},
				{
					"id": "123",
					"name": "lzw1",
					"age": 10
				},
				{
					"id": "123",
					"name": "lzw2",
					"age": 10
				},
				{
					"id": "123",
					"name": "lzw3",
					"age": 10
				}
			]
		})
	}));

	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http) {
		mockScope = $rootScope.$new();
		controller = $controller('defaultCtrl', {
			$scope: mockScope,
			$http: $http
		});
		backend.flush();
	}));

	it('Create variable', function() {
		expect(mockScope.counter).toEqual(0);
	});

	it('increments counter', function() {
		mockScope.incrementCounter();
		expect(mockScope.counter).toEqual(1);
	});

	it('makes an ajax request', function() {
		backend.verifyNoOutstandingExpectation();
	});

	it('processes the data', function() {
		expect(mockScope.products).toBeDefined();
		expect(mockScope.products.data.length).toEqual(4);
	});
});











