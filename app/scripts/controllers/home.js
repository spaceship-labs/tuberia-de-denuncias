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

    function getSchools(name) {
      return schoolsService.getSchools(name)
        .then(function(data){
          return data;
        });
    }

    function selectedSchoolChange(school){
      ctrl.schoolsService.setUserSchool(school);
    }

  }
  HomeCtrl.$inject = ['$scope', '$http', 'schoolsService'];
  angular.module('tuberiaPrototypeApp').controller('HomeCtrl', HomeCtrl);

})();
