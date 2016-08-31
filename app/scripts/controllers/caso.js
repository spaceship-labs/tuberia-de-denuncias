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
  CasoCtrl.$inject = ['$scope','$filter', '$location','$routeParams','schoolsService', 'denunciaService', '$mdDialog'];

  function CasoCtrl($scope, $filter, $location, $routeParams, schoolsService, denunciaService, $mdDialog){
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

    function goTop() {
      if (window.scrollTo) {
        window.scrollTo(0, 100);
      }
    }

    function backToState(state){
      $scope.tiposDenuncia.moveToState(state.number);
      goTop();
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
      goTop();
    }

    function userChoiceFilter(value){
      ctrl.state.selectFilter = value;
    }

    function userChoiceForm(form){
      var userForm = angular.copy(form);
      userForm.submit = true;
      var state = ctrl.state.stepNumber || 1;
      $scope.tiposDenuncia.changeState(state-1, userForm);

      showDialog();

    }

    function showDialog() {

      var confirm = $mdDialog.confirm()
        .title('Listo')
        .content('Una vez que hayas concluido tu reporte, te invitamos que califiques algunos aspectos de la atención que recibiste. Las calificaciones ayudan a detectar áreas de mejora y a reconocer los logros alcanzados')
        .ariaLabel('')
        .ok('Continuar a calificar')
        .cancel('Aceptar');

      $mdDialog.show(confirm).then(function() {
        return $location.path('/califica/' + $routeParams.token);
      }, function() {
        //$location.path("/");
      });

    }

    $scope.showDialog = showDialog;

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
        schoolsService.getConsejoEscolar(res.data.entidadId).then(setConsejo);
        schoolsService.getDelegacionFedSep(res.data.entidadId).then(setDelegacion);
        schoolsService.getInstitutoInfraestructura(res.data.entidadId).then(setInstituto);
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
        if (newVal.slug === "encuesta-salida") {
          showDialog();
        }
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

    function setConsejo(res) {
      if (res.data) {
        $scope.consejo = res.data;
      }
    }

    function setContraloria(res) {
      if (res.data) {
        $scope.sep = res.data;
      }
    }

    function setDelegacion(res) {
      if (res.data) {
        $scope.delegacionFedSep = res.data;
      }
    }

    function setInstituto(res) {
      if (res.data) {
        $scope.instituto = res.data;
      }
    }

  }

})();
