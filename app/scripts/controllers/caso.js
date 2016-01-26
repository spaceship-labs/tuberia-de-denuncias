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
  CasoCtrl.$inject = ['$scope','$filter', '$location','$routeParams','schoolsService', 'denunciaService'];

  function CasoCtrl($scope, $filter, $location, $routeParams, schoolsService, denunciaService){
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
    ctrl.backToState = backToState;
    ctrl.formSubmit = formSubmit;
    ctrl.finalInput = {};
    $scope.toConoce = toConoce;

    ctrl.init();

    function backToState(state){
      if (state && state.number) {
        ctrl.state = state;
        ctrl.state.stepNumber = state.number;
      }
    }

    function formSubmit(form){
      if (form && form.fields.length === Object.keys(ctrl.finalInput).length) {
        var data = {
          token: ctrl.token,
          finalInput: ctrl.finalInput,
          complete: true
        };
        denunciaService.updateDenuncia(data).then(function() {
          $location.path('/conoce');
        });
      }

    }

    function init(){
      ctrl.token = $routeParams.token;
      ctrl.tiposDenuncia.resetData();
      ctrl.getDenuncia();
    }


    function userChoice(choice){
      var state = ctrl.state.stepNumber || 1;
      $scope.tiposDenuncia.changeState(state-1, choice);
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

    function toConoce(){
      $location.path('/conoce');
    }

    $scope.$watch(
      function() {
        //console.log(ctrl.tiposDenuncia.getCurrentState());
        return ctrl.tiposDenuncia.getCurrentState();
      },
      function(newVal) {
        ctrl.state = newVal;
        console.log('current State', ctrl.state);
      }
    );

  }

})();
