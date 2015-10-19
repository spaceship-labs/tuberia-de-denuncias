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
  ctrl.categories = [];
  ctrl.indexCategory = 0;
  ctrl.selectedCategory = {};
  ctrl.getCategories = getCategories;
  ctrl.setSelectedCategory = setSelectedCategory;
  ctrl.icons = $scope.icons;
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

  ctrl.init();

}

ConoceCtrl.$inject = ['$scope','schoolsService'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl',ConoceCtrl);
