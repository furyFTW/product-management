(function() {
    "use script";
    angular.module("productManagement").controller("productListController", ["productRecourceFactory", productListController]);

    function productListController(productRecourceFactory) {
        var vm = this;

        productRecourceFactory.query(function(data) {
            vm.products = data;
        })
        vm.showImage = false;

        vm.toggleImage = function() {
            vm.showImage = !vm.showImage;
        }
    }
}());
