'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.schoolsService
 * @description
 * # schoolsService
 * Service in the tuberiaPrototypeApp.
 */
 (function(){

  angular
    .module('tuberiaPrototypeApp')
    .service('schoolsService', function($http){
      //user vars
      var userSchool = {};
      //var cookieSchoolName = 'tuberiadedenuncias.user.school';

      this.getSchools = getSchools;
      this.getSchool = getSchool;

      //TODO: verificar relevancia
      this.setUserSchool = setUserSchool;
      this.getUserSchool = getUserSchool;

      function getSchools(name){
        return $http({
          method: 'GET',
          url: 'http://mte.spaceshiplabs.com/api/escuelas',
          params: {
            term: name,
            solr: true
          }
        })
        .then(getSchoolsComplete)
        .catch(getSchoolsFailed);

        function getSchoolsComplete(res){
          if (res.data && res.data.escuelas) {
            return res.data.escuelas;
          }
          return [];
        }

        function getSchoolsFailed(err){
          console.log(err);
        }
      }

      function getSchool(cct){
        return $http({
          method: 'GET',
          url: 'http://mte.spaceshiplabs.com/api/escuelas',
          params: {
            ccts: cct,
            solr: true
          }
        })
        .then(getSchoolComplete)
        .catch(getSchoolFailed);

        function getSchoolComplete(res){
          if (res.data && res.data.escuelas) {
            return res.data.escuelas;
          }
          return [];
        }

        function getSchoolFailed(err){
          console.log(err);
        }
      }

      function setUserSchool(school){
        userSchool = school;
        //$cookies.remove(cookieSchoolName);
        //$cookies.putObject(cookieSchoolName, school);
      }

      function getUserSchool(){
        //var school =  $cookies.getObject(cookieSchoolName);
        //return school;
        return userSchool;
      }

    });

})();


