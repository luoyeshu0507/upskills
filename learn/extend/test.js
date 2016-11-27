'use strict';
let str = `
/**
 * Created by macbook on 16/3/8.
 */
/**
 * @name cashProductDetail
 * @description
 * 现金理财产品
 */
(function () {
    'use strict';

    angular
        .module('DirectBankProject')
        .directive('cashProductDetail', cashProductDetail);
    /**
     * @memberof directbank
     * @ngdoc directive
     * @name cashProductDetail
     * @description
     *   现金理财详情
     * @attr {String} product 产品
     * @example
     *   Usage:
     *    <cash-product-detail ng-repeat="product in vm.product"></cash-product-detail>
     */

    cashProductDetail.$inject = ['$state'];

    function cashProductDetail($state) {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/directives/productDetail/cashProductDetail/cashProductDetail.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            scope.compare = function (product) {
                console.log(product);
            };
        }
    }
})();

/**
 * Created by macbook on 16/1/19.
 */
(function () {
    'use strict';

    angular
        .module('DirectBankProject')
        .directive('interalNav', interalNav);

    function interalNav() {
        var directive = {
            restrict: 'EA',
            link: navTab
        };

        return directive;

        function navTab(scope, el, attrs) {
            el.bind('click', function () {
                var _this = $(this);
                var indexNav = _this.parent().children('a').index(_this);
                _this.addClass('bottomLine');
                _this.siblings().removeClass('bottomLine');
                $('#interal .container').eq(indexNav);
            });
        }

    }
})();

(function () {
    'use strict';

    angular
        .module('DirectBankProject')
        .directive('fundHotProduct', fundHotProduct);

    function fundHotProduct() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/directives/hotProduct/fundHotProduct/fundHotProduct.html'
        };

        return directive;
    }
})();

(function () {
    'use strict';

    angular
        .module('DirectBankProject')
        .directive('fixedHotProduct', fixedHotProduct);

    function fixedHotProduct() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/directives/hotProduct/fixedHotProduct/fixedHotProduct.html'
        };

        return directive;
    }
})();
`;

console.log(str.match(/\(function\s*\(\)\s*\{([\s\S]*?)(?=\}\)\(\)\;)/mg));






