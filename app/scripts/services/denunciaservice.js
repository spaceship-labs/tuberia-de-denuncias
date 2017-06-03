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
    .service('denunciaService', function ($http, URLAPIMODEPROD) {

      //var baseUrl = 'http://comparatuescuela/api/';
      var baseUrl = 'http://mte.spaceshiplabs.com/api/';

      if (URLAPIMODEPROD) {
        baseUrl = 'http://www.mejoratuescuela.com/api/';
      }

      console.log('url', baseUrl);

      this.getDenuncia = getDenuncia;
      this.createDenuncia = createDenuncia;
      this.updateDenuncia = updateDenuncia;
      this.exportDenuncias = exportDenuncias;

      function createDenuncia(data){
        var action = 'create_denuncia';

        return $http({
          method: 'POST',
          url: baseUrl + action,
          params: {
            data: data
          }
        });
      }

      function getDenuncia(token){
        //console.log(token);

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
          console.log("res", res);
          return res;
        }

        function getDenunciaFailed(err){
          console.log(err);
          return false;
        }
      }

      function updateDenuncia(data){
        //console.log(token);
        var action = 'update_denuncia';

        var updateDenunciaComplete = function(res){
          return res;
        };

        var updateDenunciaFailed = function(err){
          console.log(err);
          return false;
        };

        if(data.token){
          return $http({
            method: 'POST',
            url: baseUrl + action,
            params: {
              data: data
            }
          })
          .then(updateDenunciaComplete)
          .catch(updateDenunciaFailed);

        }else{
          return false;
        }
      }

      function exportDenuncias(email){
        var action = 'export_denuncias';
        var data = {
          email: email
        };

        return $http({
          method: 'POST',
          url: baseUrl + action,
          params: {
            data: data
          }
        })
        .then(exportComplete)
        .catch(exportFailed);

        function exportComplete(res){
          return res;
        }

        function exportFailed(err){
          console.log(err);
          return false;
        }
      }

    });

})();
