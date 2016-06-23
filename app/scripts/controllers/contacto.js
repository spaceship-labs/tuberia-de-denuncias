'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:ContactoCtrl
 * @description
 * # ContactoCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('ContactoCtrl', function($scope, schoolsService){
    $scope.form = {};
    $scope.send = function(form) {
      $scope.loading = true;
      schoolsService.contact(form).then(function(res) {
        $scope.loading = false;
        if (res.data && res.data.success) {
          $scope.success = true;
        } else {
          $scope.failed = true;
        }
      });
    };
  });
