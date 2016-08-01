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
      this.contact = contact;
      this.notifiesAvailable = notifiesAvailable;
      this.getSupervisor = getSupervisor;
      this.getDif = getDif;
      this.getContraloria = getContraloria;
      this.getScore = getScore;
      this.setScore = setScore;
      this.informationFixed = informationFixed;

      //TODO: verificar relevancia
      this.setUserSchool = setUserSchool;
      this.getUserSchool = getUserSchool;

      //var api = 'http://comparatuescuela/';
      var api = 'https://mte.spaceshiplabs.com/';

      function getSchools(name){
        return $http({
          method: 'GET',
          url: api + 'api/escuelas',
          params: {
            term: name,
            solr: true,//falla en sandbox...
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
          url: 'https://mte.spaceshiplabs.com/api/escuelas',
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

      function contact(form) {
        return $http({
          method: 'GET',
          url: 'https://mte.spaceshiplabs.com/api/send_email_contacto',
          params: form
        });

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

      function notifiesAvailable(form){
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/notifies_available',
          params: {
            email: form.email,
            cct: form.cct || '',
            entity: form.entity || 0
          }
        });
      }

      function getSupervisor(cct) {
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/supervisor',
          params: {
            cct: cct
          }
        });
      }

      function getDif(cct) {
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/dif',
          params: {
            cct: cct
          }
        });
      }

      function getContraloria(entidad) {
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/contraloria_sep',
          params: {
            entidad: entidad
          }
        });
      }

      function setScore(token, scores, comment) {
        comment = comment || {};
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/calificacion',
          params: {
            token: token,
            comment: comment.text || '',
            commentId: comment.pid,
            score: {
              scores: scores
            }
          }
        });
      }

      function getScore(token) {
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/get_calificacion',
          params: {
            token: token
          }
        });
      }

      function informationFixed(form) {
        return $http({
          method: 'GET',
          url: api + 'api_ventanilla_escolar/information_fixed',
          params: form
        });

      }

    });

})();


