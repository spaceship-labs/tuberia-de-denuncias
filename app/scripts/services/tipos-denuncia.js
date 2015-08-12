'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.tiposDenuncia
 * @description
 * # tiposDenuncia
 * Service in the tuberiaPrototypeApp.
 */
var list;
var stateHistory = [];
var state = 0;
var dType = 0;

angular.module('tuberiaPrototypeApp')
  .service('tiposDenuncia', function ($http,$q) {
    
    this.getList = function(){
        var deferred = $q.defer();
        $http.get('tipos-denuncia.json').then(function(res){
            list = res.data;
            registerHistory();
            deferred.resolve(list);
        });
        return deferred.promise;
    };

    this.changeState = function(option){   
        state = list[dType].estados[state].opciones[option];
        registerHistory();
    };

    this.currentState = function(){
        return list[dType].estados[state];
    };

    this.history = function(){
        return stateHistory;
    };

    var registerHistory = function(){
        stateHistory.push(angular.copy(list[dType].estados[state]));
        stateHistory[stateHistory.length-1].number = stateHistory.length;
    };


    this.getList();

  });
