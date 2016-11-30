(function() {
    "use script";
    angular.module("common.services")
        .factory("productRecourceFactory", ["$resource", productRecourceFactory]);

    function productRecourceFactory($resource) {
        return $resource("/api/products/:productId");
    }
}());
