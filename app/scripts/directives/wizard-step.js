'use strict';

/**
 * @ngdoc directive
 * @name tuberiaPrototypeApp.directive:wizardStep
 * @description
 * # wizardStep
 */
angular.module('tuberiaPrototypeApp')
  .directive('wizardStep', function() {
    return {
      templateUrl: 'views/wizard-step.html',
      restrict: 'E',
      scope: {
        options: '='
      },
      controller: function($scope, tiposDenuncia) {
        $scope.userChoice = function(option) {
          tiposDenuncia.changeState(option);
        };

        $scope.formSubmit = function(method, option) {
          tiposDenuncia.changeState(option);
        };
      }
    };
  });
