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

controller = function($scope){
	$scope.userChoice = function(key){
    $scope.$emit('userChoice',key);
  }
  $scope.formSubmit = function(method,key){
    $scope.$emit('userChoice',key); 
  }
};