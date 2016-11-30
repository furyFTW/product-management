(function() {
    "use script";
    var mock = angular.module("common.services.mock", ["ngMockE2E"]);


    mock.run(function($httpBackend) {
        var products = [{
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2009",
            "description": "Leaf rake with 48-inch handle.",
            "cost": 9.00,
            "price": 19.95,
            "category": "garden",
            "tags": ["leaf", "tool"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        }, {
            "productId": 5,
            "productName": "Hammer",
            "productCode": "TBX-0048",
            "releaseDate": "May 21, 2013",
            "description": "Curved claw steel hammer",
            "cost": 1.00,
            "price": 8.99,
            "category": "toolbox",
            "tags": ["tool"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
        }];
        var Url = "/api/products";

        $httpBackend.whenGET(Url).respond(products);

        var editRegex = new RegExp(Url + "/[0-9][0-9]*", '');

        $httpBackend.whenGET(editRegex).respond(function(method, url, data) {
            var id = url.split('/');
            var product = products.filter(function(row) {
                return row.productId == id[id.length - 1];
            })
            return [200, product, {}];
        });

        $httpBackend.whenPOST(Url).respond(function(method, url, data) {
            var product = angular.fromJson(data);
            if (!product.productId) {
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            } else {
                for (var i = products.length - 1; i >= 0; i--) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        $httpBackend.whenPOST(/app/).passThrough();
    });


}());
