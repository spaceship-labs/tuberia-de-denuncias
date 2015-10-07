'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.tiposDenuncia
 * @description
 * # tiposDenuncia
 * Service in the tuberiaPrototypeApp.
 */
var list = [];
var stateHistory = [];
var state = 0;
var dType = 0;

angular.module('tuberiaPrototypeApp')
  .service('tiposDenuncia', function($http, $q, contentful) {

    this.getList = function() {
      var deferred = $q.defer();
      contentful.entries('content_type=1CQ8zB04qAuISUQwSEWUmA').then(function(res){
        list = res.data.items;
        registerHistory();
        deferred.resolve(list);
      });
      return deferred.promise;
    };

    this.changeState = function(option) {
      state = list[dType].fields.machine[state][option]-1;
      registerHistory();
    };

    this.currentState = function() {
      if(list.length){
        //Adding step number
        list[dType].fields.states[state].fields.stepNumber = state+1;
      }
      return list.length ? list[dType].fields.states[state].fields : false;
    };

    this.history = function() {
      return stateHistory;
    };

    this.list = function() {
      return list;
    };

    var registerHistory = function() {
      stateHistory.push(angular.copy(list[dType].fields.states[state].fields));
      stateHistory[stateHistory.length - 1].number = stateHistory.length;
    };

    this.getList();

  });
