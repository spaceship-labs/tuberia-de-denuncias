'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CasoCtrl
 * @description
 * # CasoCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CasoCtrl', function($scope,$filter) {
    $scope.setDate = function(){
      var date = new Date();
      var dateStr = $filter('date')(date,'dd/MM/yyyy');
      $scope.currDate = dateStr;
    };

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

    $scope.setDate();

  });
