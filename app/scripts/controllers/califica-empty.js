'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CalificaEmptyCtrl
 * @description
 * # CalificaEmptyCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CalificaEmptyCtrl', function ($scope) {

    $scope.toggleMailSignIn = false;

    $scope.closeMailForm = function() {
      $scope.toggleMailSignIn = false;
    };
  });
