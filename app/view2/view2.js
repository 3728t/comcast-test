'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.processingResult = [];
  // fetch the data, creating new props and delete old props.
  $http.get('/data.json')
    .then(function(res) {
      for(var i = 0;i < res.data.length;i++) {
        var tempProp = res.data[i].category;
        res.data[i][tempProp] = res.data[i].amount;
        delete res.data[i].category;
        delete res.data[i].amount;
      }
      // Next use object as a map to merge the objects
      var map = {};
      for(var i = 0;i < res.data.length;i++) {
        if(map.hasOwnProperty(res.data[i].name)) {
          Object.assign(map[res.data[i].name], res.data[i]);
        }else {
          map[res.data[i].name] = res.data[i];
        }
      }
      // Add '-' for the missing prop and push the result to the processingResult array.
      for(var a in map) {
        if(!map[a].hasOwnProperty('C1')) {
          map[a]['C1'] = '-';
        }
        if(!map[a].hasOwnProperty('C2')) {
          map[a]['C2'] = '-';
        }
        if(!map[a].hasOwnProperty('C3')) {
          map[a]['C3'] = '-';
        }
        $scope.processingResult.push(map[a]);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}]);
