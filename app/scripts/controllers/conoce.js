'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:ConoceCtrl
 * @description
 * # ConoceCtrl
 * Controller of the tuberiaPrototypeApp
 */
function ConoceCtrl($scope ,$location, schoolsService){
  var ctrl = this;
  ctrl.searchText = '';
  ctrl.categories = [];
  ctrl.indexCategory = 0;
  ctrl.selectedCategory = {};
  ctrl.tiposDenuncia = $scope.tiposDenuncia;
  ctrl.icons = $scope.icons;
  ctrl.toggleMailSignIn = false;
  ctrl.params = {};

  ctrl.getSchools = getSchools;
  ctrl.setSelectedSchool = setSelectedSchool;
  ctrl.removeSelectedSchool = removeSelectedSchool;
  ctrl.getCategories = getCategories;
  ctrl.setSelectedCategory = setSelectedCategory;
  ctrl.startReport = startReport;
  ctrl.init = init;

  function getCategories(){
    ctrl.tiposDenuncia.getCategories()
      .then(function(data){
        ctrl.categories = data;
        ctrl.selectedCategory = ctrl.categories[ctrl.indexCategory];
      });
  }

  function setSelectedCategory(index){
    ctrl.indexCategory = index;
    ctrl.selectedCategory = ctrl.categories[ctrl.indexCategory];
  }

  function getSchools(name) {
    return schoolsService.getSchools(name)
      .then(function(data){
        return data;
      });
  }

  function setSelectedSchool(){
    if(ctrl.selectedSchool){
      schoolsService.setUserSchool(ctrl.selectedSchool);
    }
  }
  function removeSelectedSchool(){
    ctrl.selectedSchool = {};
  }

  function init(){
    ctrl.getCategories();
  }

  function startReport(dType){
    ctrl.toggleMailSignIn = true;
    ctrl.params.startDate = new Date();
    ctrl.params.dTypeSlug = dType.fields.slug;
    ctrl.params.dTypeId = dType.sys.id;
    ctrl.params.cct = ctrl.selectedSchool.cct;
  }


  ctrl.init();

}

ConoceCtrl.$inject = ['$scope', '$location','schoolsService', 'denunciaService'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl',ConoceCtrl);
