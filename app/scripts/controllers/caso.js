'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CasoCtrl
 * @description
 * # CasoCtrl
 * Controller of the tuberiaPrototypeApp
 */
(function(){

  angular.module('tuberiaPrototypeApp').controller('CasoCtrl', CasoCtrl);
  CasoCtrl.$inject = ['$scope','$filter','schoolsService'];

  function CasoCtrl($scope,$filter,schoolsService){
    var ctrl = this;
    ctrl.init = init;
    ctrl.setDate = setDate;
    ctrl.userChoice = userChoice;
    ctrl.tiposDenuncia = $scope.tiposDenuncia;

    ctrl.init();

    function init(){
      ctrl.school = schoolsService.getUserSchool();
      ctrl.setDate();
    }

    function setDate(){
      var date = new Date();
      var dateStr = $filter('date')(date,'dd/MM/yyyy');
      ctrl.currDate = dateStr;
    }

    function userChoice(choice){
      $scope.tiposDenuncia.changeState(choice);
    }

    $scope.$watch(
      function() {
        return $scope.tiposDenuncia.getCurrentState();
      },
      function(newVal) {
        ctrl.state = newVal;
      }
    );

  }

})();
