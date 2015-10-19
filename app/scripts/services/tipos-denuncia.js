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
      this.resetHistory = resetHistory;
      this.registerHistory = registerHistory;
      this.getCurrentList = getCurrentList;
      this.setDtype = setDtype;

      //this.getList();

      function getList() {
        var deferred = $q.defer();
        contentful.entries('content_type=1CQ8zB04qAuISUQwSEWUmA').then(function(res){
          list = res.data.items;
          console.log(list);
          registerHistory();
          deferred.resolve(list);
        });
        return deferred.promise;
      }

      function changeState(option) {
        console.log(list[dType].fields);
        state = list[dType].fields.machine[state][option]-1;
        console.log(state);
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

      function resetHistory(){
        stateHistory = [];
      }

      function getCurrentList(){
        return list;
      }

      function registerHistory() {
        if(list[dType].fields.states){
          console.log('registro historia');
          stateHistory.push(angular.copy(list[dType].fields.states[state].fields));
          stateHistory[stateHistory.length - 1].number = stateHistory.length;
        }
      }

      function setDtype(d){
        dType = d;
      }

    });

})();
