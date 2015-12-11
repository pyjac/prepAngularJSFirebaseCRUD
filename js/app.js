var myApp = angular.module('myApp', ['firebase']);

myApp.controller('ProductsCtrl', ['$scope','$firebaseArray', function($scope,$firebaseArray) {

    var firebaseProductsRef = new Firebase('https://glowing-heat-1205.firebaseio.com/products');


    $scope.products = $firebaseArray(firebaseProductsRef);

    $scope.showForm = function() {
        $scope.addFormShow = true;
        $scope.editFormShow = false;
        clearForm();
    }

    $scope.hideForm = function() {
        $scope.addFormShow = false;
    }

    function clearForm() {
        $scope.productName = '';
        $scope.productCode = '';
        $scope.description = '';
        $scope.price = '';
    }

    $scope.addFormSubmit = function() {
        
        $scope.products.$add({
            productName: $scope.productName,
            productCode: $scope.productCode,
            description: $scope.description,
            price: $scope.price
        })

        clearForm();
    }

    $scope.showProduct= function(product) {
        $scope.addFormShow = false;
        $scope.editFormShow = true;

        $scope.productName = product.productName;
        $scope.productCode = product.productCode;
        $scope.description = product.description;
        $scope.price = product.price;
        $scope.id = product.$id;
    }

    $scope.editFormSubmit = function() {
        var id = $scope.id;
        var product = $scope.products.$getRecord(id);
        product.productName = $scope.productName;
        product.productCode = $scope.productCode;
        product.description = $scope.description;
        product.price = $scope.price;

        $scope.products.$save(product);
    }

    $scope.deleteProduct = function(product) {
       $scope.products.$remove(product);
    }
}]);
