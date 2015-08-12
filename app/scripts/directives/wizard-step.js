'use strict';

/**
 * @ngdoc directive
 * @name tuberiaPrototypeApp.directive:wizardStep
 * @description
 * # wizardStep
 */
var controller; 

angular.module('tuberiaPrototypeApp')
  .directive('wizardStep', function () {
    return {
      templateUrl: 'views/wizard-step.html',
      restrict: 'E',
      controller: controller,
      scope : {
      	options : '='
      }
    };
  });

controller = function($scope,tiposDenuncia){
	$scope.userChoice = function(option){
    tiposDenuncia.changeState(option);
  };

  $scope.formSubmit = function(method,option){
    tiposDenuncia.changeState(option);
  };
};