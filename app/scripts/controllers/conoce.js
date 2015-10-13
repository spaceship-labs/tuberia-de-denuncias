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
  ctrl.schools = [];
  ctrl.addSchool = addSchool;
  ctrl.removeSchool = removeSchool;
  ctrl.searchText = '';

  function getSchools(name) {
    return schoolsService.getSchools(name)
      .then(function(data){
        return data;
      });
  }

  function addSchool(school){
    if(school){
      ctrl.schools.push(school);
      ctrl.searchTerm = '';
      ctrl.selectedSchool = null;
    }
  }
  function removeSchool(list,schoolIndex){
    list.splice(schoolIndex, 1);
  }
}

ConoceCtrl.$inject = ['$scope','schoolsService'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl',ConoceCtrl);
