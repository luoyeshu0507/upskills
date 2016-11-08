angular.module('exampleApp', [])
.controller('defaultCtrl', function($scope, $http) {
	$scope.counter = 0;

	$http.get('product.json').success(function(data) {
		$scope.products = data;
	});

    $scope.incrementCounter = function() {
        $scope.counter++;
    }
})