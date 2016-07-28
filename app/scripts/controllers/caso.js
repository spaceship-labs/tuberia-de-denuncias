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
    ctrl.userChoiceForm = userChoiceForm;
    ctrl.userChoiceFilter = userChoiceFilter;
    $scope.toConoce = toConoce;

    ctrl.init();

    function backToState(state){
      $scope.tiposDenuncia.moveToState(state.number);
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

    function userChoiceFilter(value){
      ctrl.state.selectFilter = value;
    }

    function userChoiceForm(form){
      var userForm = angular.copy(form);
      userForm.submit = true;
      var state = ctrl.state.stepNumber || 1;
      $scope.tiposDenuncia.changeState(state-1, userForm);
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
        schoolsService.getSupervisor(res.data.cct).then(setSupervisor);
        schoolsService.getDif(res.data.cct).then(setDif);
        schoolsService.getContraloria(res.data.entidadId).then(setContraloria);
      });
    }

    function toConoce(){
      $location.path('/conoce');
    }

    $scope.$watch(
      function() {
        return ctrl.tiposDenuncia.getCurrentState();
      },
      function(newVal) {
        ctrl.state = newVal;
      }
    );

    function setSupervisor(res) {
      if (res.data) {
        $scope.supervisor = res.data;
      }
    }

    function setDif(res) {
      if (res.data) {
        $scope.dif = res.data;
      }
    }

    function setContraloria(res) {
      if (res.data) {
        $scope.sep = res.data;
      }
    }

  }

})();
