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
  var denunciaType = null;

  angular.module('tuberiaPrototypeApp')
    .service('tiposDenuncia', function($http, $q, contentful){
      this.getList = getList;
      this.getCategories = getCategories;
      this.changeState = changeState;
      this.getCurrentState = getCurrentState;
      this.getHistory = getHistory;
      this.resetData = resetData;
      this.registerHistory = registerHistory;
      this.getCurrentList = getCurrentList;
      this.getDenunciaType = getDenunciaType;

      //this.getList();

      function getCategories() {
        var deferred = $q.defer();
        contentful.entries('content_type=7ohwe7A24M4A064oyUWQo').then(function(res){
          deferred.resolve(res.data.items);
        });
        return deferred.promise;
      }


      function getList() {
        var deferred = $q.defer();
        contentful.entries('content_type=1CQ8zB04qAuISUQwSEWUmA').then(function(res){
          list = res.data.items;
          deferred.resolve(list);
        });
        return deferred.promise;
      }

      function getDenunciaType(dTypeId){
        var deferred = $q.defer();
        contentful.entries('sys.id='+dTypeId).then(function(res){
          if(res.data.items.length > 0){
            deferred.resolve(res.data.items[0]);
            denunciaType = res.data.items[0];
            registerHistory();
          }
        });
        return deferred.promise;
      }

      function changeState(option) {
        state = denunciaType.fields.machine[state][option]-1;
        registerHistory();
      }

      function getCurrentState() {
        if(denunciaType){
          //Adding step number
          denunciaType.fields.states[state].fields.stepNumber = state+1;

          return denunciaType ? denunciaType.fields.states[state].fields : false;
        }else{
          return false;
        }

      }

      function getHistory() {
        return stateHistory;
      }

      function resetData(){
        stateHistory = [];
        denunciaType = null;
        state = 0;
      }

      function getCurrentList(){
        return list;
      }

      function registerHistory() {
        //if(list[dType].fields.states){
        //Adding date
        var date = new Date();
        denunciaType.fields.states[state].fields.date  = date;

        stateHistory.push(angular.copy(denunciaType.fields.states[state].fields));
        stateHistory[stateHistory.length - 1].number = stateHistory.length;
      }


    });

})();
