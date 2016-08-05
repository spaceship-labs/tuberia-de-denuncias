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
    .service('tiposDenuncia', function($http, $q, $mdDialog, contentful, denunciaService){
      this.getList = getList;
      this.getCategories = getCategories;
      this.changeState = changeState;
      this.getCurrentState = getCurrentState;
      this.getHistory = getHistory;
      this.resetData = resetData;
      this.getCurrentList = getCurrentList;
      this.getDenunciaType = getDenunciaType;
      this.restoreHistory = restoreHistory;
      this.moveToState = moveToState;

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
              restoreHistory(denuncia.history, denuncia.entidadId);
            }
            deferred.resolve(res.data.items[0]);
          }
        });
        return deferred.promise;
      }

      function checkSelectFilter(options, filter, select) {
        if (filter && Object.keys(filter).length && options && Object.keys(options).length) {
          var nextOption = options[select];
          if (!select || !nextOption) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Elige una opcion por favor')
                .content('Debe de elegir una opción valida')
                .ok('Aceptar')
              );
              return false;
          }
          return nextOption;
        }
        return options;
      }

      function moveToState(currentState) {
        state = currentState-1;
      }

      function changeState(currentState, option) {

        console.log('changeState', option);
        if (option.toFixed) {
          var nextOption = denunciaType.fields.machine[currentState][option];

          nextOption = checkSelectFilter(nextOption, stateHistory[state].filter ,stateHistory[state].selectFilter);

          if (nextOption === false) {
            return ;
          }


          if (nextOption < -1) {
            var confirm = $mdDialog.confirm()
              .content('Antes de presentar una queja, es recomendable haber intentado solucionar la situación dentro de tu escuela. ¿Estás seguro que quieres ir al siguiente paso?')
              .ok('Continuar')
              .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
              state = Math.abs(nextOption)-1;
              updateStateHistory(_denuncia, currentState, option, state);
            }, function() {
              console.log("cancel");
            });
          } else {
            state = nextOption-1;
            updateStateHistory(_denuncia, currentState, option, state);
          }
        } else if (option && option.submit) {
          updateStateHistory(_denuncia, currentState, option, state);
        }

      }

      function getCurrentState() {
        if (denunciaType) {
          //Adding step number
          //denunciaType.fields.states[state].fields.stepNumber = state+1;
          //return denunciaType ? denunciaType.fields.states[state].fields : false;
          if (stateHistory && stateHistory.length) {
            stateHistory[state].stepNumber = state + 1;
            return stateHistory[state];
          }
          return false;
        }

        return false;


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

      function restoreHistory(history, entidadId){
        entidadId = entidadId || '';

        var contentField = 'content' + entidadId;
        if(history && history.length){
          stateHistory = [];

          denunciaType.fields.states.forEach(function(stateItem, i) {
            var stateItemFields = angular.copy(stateItem.fields);
            //var historyItem = history[i] || {};
            var historyItemIndex = history.filter(function(h) {
              return h.index === i;
            });

            var historyItem = historyItemIndex[0] || {};

            stateItemFields.number = i + 1;
            stateItemFields.select =  historyItem.select || {};
            stateItemFields.answer = historyItem.answer;
            if (historyItem.date) {
              stateItemFields.date = historyItem.date;
            }

            if (historyItem.selectFilter) {
              stateItemFields.selectFilter = historyItem.selectFilter;
            }

            stateItemFields.content = stateItemFields[contentField] || stateItemFields.content;
            stateHistory.push(stateItemFields);
          });

          state = history[history.length - 1].nextState || 0;

        }else{
          state = 0;
          stateHistory = [];
        }
      }

      function updateStateHistory(denuncia, state, option, nextState) {
        var currentDate = new Date(),
          select;

        if (option.toFixed) {
          select = {
            index: option,
            text: stateHistory[state].options[option],
            slug: stateHistory[state].slug || stateHistory[state].title
          };
        } else {
          select = option;
        }

        stateHistory[state].select = select;
        stateHistory[state].date = currentDate;
        stateHistory[state].nextState = stateHistory[nextState] ? nextState : state;


        /*
        var next = angular.copy(denunciaType.fields.states[nextState].fields);
        next.number = nextState + 1;
        if (stateHistory[nextState]) {
          stateHistory[nextState] = next;
        } else {
          stateHistory.push(next);
        }
        */

        var history = stateHistory.map(function(h){
          console.log('h.', h.number, h.stepId);
          return {
            index: h.number-1,
            number: h.number,
            date: h.date,
            nextState: h.nextState,
            select: h.select,
            selectFilter: h.selectFilter,
            answer: h.answer,
            stepId: h.stepId
          };
        }).filter(function(h) {
          return h.answer || h.date;
        });


        if (denuncia) {
          denuncia.history = history;
          denunciaService.updateDenuncia(denuncia).then(function(res) {
            if (res && res.data && res.data.history && res.data.history[state]) {
              stateHistory[state].answer = res.data.history[state].answer;
            }
          });
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
