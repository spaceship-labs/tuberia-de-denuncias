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
    ctrl.schoolsService = schoolsService;
    ctrl.getSchools = getSchools;
    ctrl.selectedSchoolChange = selectedSchoolChange;
    ctrl.tiposDenuncia = $scope.tiposDenuncia;
    ctrl.tiposDenunciaList = [];
    ctrl.getTiposDenuncia = getTiposDenuncia;
    ctrl.icons = $scope.icons;
    ctrl.init = init;

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

    function init(){
      ctrl.getTiposDenuncia();
    }

    ctrl.init();

  }
  HomeCtrl.$inject = ['$scope', '$http', 'schoolsService'];
  angular.module('tuberiaPrototypeApp').controller('HomeCtrl', HomeCtrl);

})();
