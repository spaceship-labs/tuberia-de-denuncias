'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the tuberiaPrototypeApp
 */
(function(){

  function HomeCtrl($scope,$http,schoolsService){
    var ctrl = this;

    ctrl.toggleMailSignIn = false;
    ctrl.params = {};
    ctrl.tiposDenuncia = $scope.tiposDenuncia;
    ctrl.tiposDenunciaList = [];
    ctrl.icons = $scope.icons;

    ctrl.schoolsService = schoolsService;
    ctrl.getSchools = getSchools;
    ctrl.selectedSchoolChange = selectedSchoolChange;
    ctrl.getTiposDenuncia = getTiposDenuncia;
    ctrl.startReport = startReport;
    ctrl.closeMailForm = closeMailForm;
    ctrl.init = init;

    function closeMailForm(){
      ctrl.toggleMailSignIn = false;
    }

    function getTiposDenuncia(){
      ctrl.tiposDenuncia.getList()
        .then(function(data){
          ctrl.tiposDenunciaList = data;
        });
    }

    function getSchools(name) {
      return schoolsService.getSchools(name)
        .then(function(data){
          return data;
        });
    }

    function selectedSchoolChange(school){
      ctrl.schoolsService.setUserSchool(school);
    }

    function startReport(dType){
      ctrl.toggleMailSignIn = true;
      ctrl.params.startDate = new Date();
      ctrl.params.dType = dType;
      ctrl.params.cct = ctrl.selectedSchool.cct;
    }

    function init(){
      ctrl.getTiposDenuncia();
    }

    ctrl.init();

  }
  HomeCtrl.$inject = ['$scope', '$http', 'schoolsService'];
  angular.module('tuberiaPrototypeApp').controller('HomeCtrl', HomeCtrl);

})();
