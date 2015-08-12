'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the tuberiaPrototypeApp
 */

angular.module('tuberiaPrototypeApp')
  .controller('HomeCtrl', function ($scope) {
    
    $scope.tipoDenuncia = 0;
    $scope.currentState = 0;
    $scope.options = $scope.tiposDenuncia[$scope.tipoDenuncia].estados[$scope.currentState].variables;
    
    $scope.$on('userChoice',function(event,key){
    	$scope.currentState = $scope.tiposDenuncia[$scope.tipoDenuncia].estados[$scope.currentState].opciones[key];
    });

  });
