'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CasoCtrl
 * @description
 * # CasoCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CasoCtrl', function($scope) {
    $scope.$watch(
      function() {
        return $scope.tiposDenuncia.currentState();
      },
      function(newVal) {
        $scope.state = newVal;
      }
    );

    $scope.userChoice = function(choice){
      $scope.tiposDenuncia.changeState(choice);
    };

  });
