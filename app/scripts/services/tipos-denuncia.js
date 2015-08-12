'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.tiposDenuncia
 * @description
 * # tiposDenuncia
 * Service in the tuberiaPrototypeApp.
 */
var list;

angular.module('tuberiaPrototypeApp')
  .service('tiposDenuncia', function ($http,$q) {
    
    this.getList = function(){
        var deferred = $q.defer();
        $http.get('tipos-denuncia.json').then(function(res){
            deferred.resolve(res.data);
            list = res.data;
        });
        return deferred.promise;
    };

  });
