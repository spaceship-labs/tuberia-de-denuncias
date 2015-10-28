'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.denunciaService
 * @description
 * # denunciaService
 * Service in the tuberiaPrototypeApp.
 */
(function(){

  angular.module('tuberiaPrototypeApp')
    .service('denunciaService', function ($http) {

      var baseUrl = 'http://mte.spaceshiplabs.com/api/';

      this.getDenuncia = getDenuncia;
      this.createDenuncia = createDenuncia;

      function getDenuncia(token){
        console.log(token);
        var action = 'read_denuncia';
        var data = {
          token: token
        };

        return $http({
          method: 'GET',
          url: baseUrl + action,
          params: {
            data: data
          }
        })
        .then(getDenunciaComplete)
        .catch(getDenunciaFailed);

        function getDenunciaComplete(res){
          return res;
        }

        function getDenunciaFailed(err){
          console.log(err);
          return false;
        }
      }

      function createDenuncia(data){
        var action = 'create_denuncia';

        return $http({
          method: 'POST',
          url: baseUrl + action,
          params: {
            data: data
          }
        })
        .then(createDenunciaComplete)
        .catch(createDenunciaFailed);

        function createDenunciaComplete(res){
          return res;
        }

        function createDenunciaFailed(err){
          console.log(err);
          return false;
        }
      }

    });

})();
