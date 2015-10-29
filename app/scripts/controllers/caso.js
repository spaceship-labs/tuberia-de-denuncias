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
  CasoCtrl.$inject = ['$scope','$filter','$routeParams','schoolsService', 'denunciaService'];

  function CasoCtrl($scope,$filter,$routeParams,schoolsService, denunciaService){
    var ctrl = this;

    ctrl.tiposDenuncia = $scope.tiposDenuncia;
    ctrl.tiposDenunciaList = [];
    ctrl.school = {};
    ctrl.token = null;
    ctrl.dType = null;

    ctrl.init = init;
    ctrl.userChoice = userChoice;
    ctrl.getDenuncia = getDenuncia;
    ctrl.getUserSchool = getUserSchool;
    ctrl.getTipoDenuncia = getTipoDenuncia;

    ctrl.init();

    function init(){
      ctrl.token = $routeParams.token;
      ctrl.tiposDenuncia.resetData();
      ctrl.getDenuncia();
    }


    function userChoice(choice){
      $scope.tiposDenuncia.changeState(choice);
    }

    function getUserSchool(cct){
      schoolsService.getSchool(cct).then(function(res){
        if(res.length > 0){
          ctrl.school = res[0];
        }
      });
    }

    function getTipoDenuncia(dTypeId, denuncia){
      ctrl.tiposDenuncia.getDenunciaType(dTypeId, denuncia).then(function(dType){
        ctrl.dType = dType;
      });
    }


    function getDenuncia(){
      var token = ctrl.token;
      denunciaService.getDenuncia(token).then(function(res){
        ctrl.getUserSchool(res.data.cct);
        ctrl.getTipoDenuncia(res.data.dTypeId, res.data);
      });
    }

    $scope.$watch(
      function() {
        return ctrl.tiposDenuncia.getCurrentState();
      },
      function(newVal) {
        ctrl.state = newVal;
      }
    );

  }

})();
