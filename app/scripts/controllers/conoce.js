'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:ConoceCtrl
 * @description
 * # ConoceCtrl
 * Controller of the tuberiaPrototypeApp
 */
function ConoceCtrl($scope,schoolsService){
  var ctrl = this;
  ctrl.getSchools = getSchools;
  ctrl.setSelectedSchool = setSelectedSchool;
  ctrl.removeSelectedSchool = removeSelectedSchool;
  ctrl.searchText = '';
  ctrl.tiposDenuncia = $scope.tiposDenuncia;
  ctrl.tiposDenunciaList = [];
  ctrl.indexTipoDenuncia = 0;
  ctrl.selectedTipoDenuncia = {};
  ctrl.getTiposDenuncia = getTiposDenuncia;
  ctrl.setSelectedTipoDenuncia = setSelectedTipoDenuncia;
  ctrl.icons = $scope.icons;

  function getTiposDenuncia(){
    ctrl.tiposDenuncia.getList()
      .then(function(data){
        var dtypes = [];
        var resList = data.filter(function(dtype){
          if(dtypes.indexOf(dtype.fields.label) <= 0){
            dtypes.push(dtype.fields.label);
            return true;
          }else{
            return false;
          }
        });
        ctrl.tiposDenunciaList = resList;
        ctrl.selectedTipoDenuncia = ctrl.tiposDenunciaList[ctrl.indexTipoDenuncia];
      });
  }

  function setSelectedTipoDenuncia(index){
    ctrl.indexTipoDenuncia = index;
    ctrl.selectedTipoDenuncia = ctrl.tiposDenunciaList[ctrl.indexTipoDenuncia];
  }

  function getSchools(name) {
    return schoolsService.getSchools(name)
      .then(function(data){
        return data;
      });
  }


  function setSelectedSchool(school){
    if(school){
      ctrl.selectedSchool = school;
      schoolsService.setUserSchool(school);
    }
  }
  function removeSelectedSchool(){
    ctrl.selectedSchool = {};
  }

  ctrl.getTiposDenuncia();

}

ConoceCtrl.$inject = ['$scope','schoolsService'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl',ConoceCtrl);
