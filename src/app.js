import 'angular';
import 'angular-ui-bootstrap';

var myApp = angular.module('myApp', ['ui.bootstrap', 'elasticsearch', 'ngTable']);
myApp.service('client', function (esFactory) {
  return esFactory({
    host: 'localhost:9200',
  });
});
myApp.controller("elasticController", function($scope, client, $modal ){
    $scope.searchText = '';

    $scope.searchPress = function(event) {
        if (event.which === 13) {
            $scope.search();
        }
    };

    $scope.search = function() {
        client.search({
          index: 'open_market',
          type: 'market',
          body: {
            query: {
              term: {
                item_name: $scope.searchText
              }
            }
          }
        }).then(function (resp) {
            $scope.hits = resp.hits.hits;
        }, function (err) {
            console.trace(err.message);
        });
    };

    $scope.create = function() {
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
            items: function () {
              return $scope.hits;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          
        });
    };
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, client) {

  $scope.items = items;
  

  $scope.ok = function () {
    console.log(client);

    //$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});