'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.tiposDenuncia
 * @description
 * # tiposDenuncia
 * Service in the tuberiaPrototypeApp.
 */
 (function(){

  var list = [];
  var stateHistory = [];
  var state = 0;
  var dType = 0;

  angular.module('tuberiaPrototypeApp')
    .service('tiposDenuncia', function($http, $q, contentful){
      this.getList = getList;
      this.changeState = changeState;
      this.getCurrentState = getCurrentState;
      this.getHistory = getHistory;
      this.registerHistory = registerHistory;
      this.getCurrentList = getCurrentList;

      this.getList();

      function getList() {
        var deferred = $q.defer();
        contentful.entries('content_type=1CQ8zB04qAuISUQwSEWUmA').then(function(res){
          list = res.data.items;
          registerHistory();
          deferred.resolve(list);
        });
        return deferred.promise;
      }

      function changeState(option) {
        state = list[dType].fields.machine[state][option]-1;
        registerHistory();
      }

      function getCurrentState() {
        if(list.length){
          //Adding step number
          list[dType].fields.states[state].fields.stepNumber = state+1;
        }
        return list.length ? list[dType].fields.states[state].fields : false;
      }

      function getHistory() {
        return stateHistory;
      }

      function getCurrentList(){
        return list;
      }

      function registerHistory() {
        if(list[dType].fields.states){
          stateHistory.push(angular.copy(list[dType].fields.states[state].fields));
          stateHistory[stateHistory.length - 1].number = stateHistory.length;
        }
      }

    });

})();
