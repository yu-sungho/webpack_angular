import '../src/style.less';
import config from '../src/config.json';
import 'angular';
import 'angular-ui-bootstrap';
import 'angular-resource';

angular.module('myApp', ['ui.bootstrap',require('angular-resource')])
.controller("testController", function($scope, $resource){
    $scope.date = "test111";
    
    $scope.productsResource = $resource("http://localhost:5500/products/");
    
    $scope.listProducts = function(){
        $scope.products = $scope.productsResource.query();
        $scope.products.$promise.then(function(data){
            console.log(data);
        });
    };
    
    $scope.listProducts();
    
}
);