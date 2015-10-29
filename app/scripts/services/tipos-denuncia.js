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
  var _denuncia = null;
  var restoredHistory = false;

  angular.module('tuberiaPrototypeApp')
    .service('tiposDenuncia', function($http, $q, contentful, denunciaService){
      this.getList = getList;
      this.getCategories = getCategories;
      this.changeState = changeState;
      this.getCurrentState = getCurrentState;
      this.getHistory = getHistory;
      this.resetData = resetData;
      this.registerHistory = registerHistory;
      this.getCurrentList = getCurrentList;
      this.getDenunciaType = getDenunciaType;
      this.restoreHistory = restoreHistory;

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

      function getDenunciaType(dTypeId, denuncia){
        var deferred = $q.defer();
        contentful.entries('sys.id='+dTypeId).then(function(res){
          if(res.data.items.length > 0){
            denunciaType = res.data.items[0];
            _denuncia = denuncia;
            restoreHistory(denuncia.history);
            if(!restoredHistory){
              registerHistory(denuncia);
            }
            deferred.resolve(res.data.items[0]);
          }
        });
        return deferred.promise;
      }

      function changeState(option) {
        state = denunciaType.fields.machine[state][option]-1;
        registerHistory(_denuncia);
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
        _denuncia = null;
        state = 0;
      }

      function getCurrentList(){
        return list;
      }

      function restoreHistory(history){
        console.log('restoreHistory');
        if(history && history.length > 0){
          console.log(history);
          restoredHistory = true;
          var index;
          stateHistory = [];

          for(var i=0;i<history.length;i++){
            var historyItem = history[i];
            index = historyItem.index;
            var stateItem = angular.copy( denunciaType.fields.states[index].fields );
            stateItem.number = historyItem.number;
            stateItem.date = historyItem.date;
            stateHistory.push(stateItem);
          }
          console.log('despues del restore, quedo:');
          console.log(stateHistory);

          state = index;
        }else{
          state = 0;
          stateHistory = [];
        }
        console.log(state);
      }


      function registerHistory(denuncia) {
        console.log('registerHistory');

        //Adding date
        var date = new Date();
        denunciaType.fields.states[state].fields.date  = date;

        stateHistory.push(angular.copy(denunciaType.fields.states[state].fields));
        stateHistory[stateHistory.length - 1].number = stateHistory.length;

        //Para guardar datos escenciales en la BD
        var history = stateHistory.map(function(itemState){
          var itemHistory = {
            index: (itemState.number - 1),
            number: itemState.number,
            date: itemState.date
          };
          return itemHistory;
        });

        denuncia.history = history;

        denunciaService.updateDenuncia(denuncia);

      }


    });

})();
