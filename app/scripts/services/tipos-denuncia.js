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

  angular.module('tuberiaPrototypeApp')
    .service('tiposDenuncia', function($http, $q, contentful, denunciaService){
      this.getList = getList;
      this.getCategories = getCategories;
      this.changeState = changeState;
      this.getCurrentState = getCurrentState;
      this.getHistory = getHistory;
      this.resetData = resetData;
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
            if(denuncia){
              _denuncia = denuncia;
              restoreHistory(denuncia.history);
            }
            deferred.resolve(res.data.items[0]);
          }
        });
        return deferred.promise;
      }

      function changeState(currentState, option) {
        state = denunciaType.fields.machine[currentState][option]-1;
        updateStateHistory(_denuncia, currentState, option, state);
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
        if(history && history.length){
          var index;
          stateHistory = [];

          for(var i=0;i<history.length;i++){
            var historyItem = history[i];
            index = historyItem.index;
            //console.log(denunciaType.fields.states[index].fields);
            var stateItem = angular.copy( denunciaType.fields.states[index].fields );
            //console.log('StateItem', stateItem);
            stateItem.number = historyItem.number;
            stateItem.numberToShow = historyItem.numberToShow;
            stateItem.date = historyItem.date;
            stateItem.select = stateItem.select;
            stateHistory.push(stateItem);
          }

          state = index;
        }else{
          state = 0;
          stateHistory = [];
        }
      }

      function updateStateHistory(denuncia, state, option, nextState) {
        var currentDate = new Date(),
          select = {
          index: option,
          text: stateHistory[state].options[option]
        };

        stateHistory[state].select = select;
        stateHistory[state].date = currentDate;

        var next = angular.copy(denunciaType.fields.states[nextState].fields);
        next.number = nextState + 1;
        if (stateHistory[nextState]) {
          stateHistory[nextState] = next;
        } else {
          stateHistory.push(next);
        }

        var history = stateHistory.map(function(h){
          return {
            index: h.number-1,
            number: h.number,
            date: currentDate,
            select: h.select,
          };
        });


        //console.log('stateHistory', stateHistory);
        if (denuncia) {
          denuncia.history = history;
          denunciaService.updateDenuncia(denuncia);
        }


      }
      /*

      function registerHistory(denuncia) {
        //Adding date
        var date = new Date();
        denunciaType.fields.states[state].fields.date  = date;

        //stateHistory.push(angular.copy(denunciaType.fields.states[state].fields));
        //stateHistory[stateHistory.length - 1].number = state + 1;


        //Para guardar datos escenciales en la BD
        var history = stateHistory.map(function(itemState){
          var itemHistory = {
            index: (itemState.number - 1),
            number: itemState.number,
            date: itemState.date
          };
          return itemHistory;
        });

        if(denuncia){
          //denuncia.history = history;
          //denunciaService.updateDenuncia(denuncia);
        }

      }
      */


    });

})();
