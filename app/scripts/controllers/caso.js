'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CasoCtrl
 * @description
 * # CasoCtrl
 * Controller of the tuberiaPrototypeApp
 */
(function(){

  angular.module('tuberiaPrototypeApp').controller('CasoCtrl', CasoCtrl);
  CasoCtrl.$inject = ['$scope','$filter','$routeParams','schoolsService', 'denunciaService', 'userService'];

  function CasoCtrl($scope,$filter,$routeParams,schoolsService, denunciaService, userService){
    var ctrl = this;

    ctrl.tiposDenuncia = $scope.tiposDenuncia;
    ctrl.tiposDenunciaList = [];
    ctrl.school = {};

    ctrl.init = init;
    ctrl.setDate = setDate;
    ctrl.userChoice = userChoice;
    ctrl.getCurrentTypeIndex = getCurrentTypeIndex;
    ctrl.getTiposDenuncia = getTiposDenuncia;
    ctrl.getDenuncia = getDenuncia;
    ctrl.getUserSchool = getUserSchool;

    ctrl.init();

    function init(){
      //ctrl.school = schoolsService.getUserSchool();
      ctrl.setDate();
      ctrl.tiposDenuncia.resetData();
      ctrl.getTiposDenuncia();
      ctrl.getDenuncia();
    }

    function getTiposDenuncia(){
      ctrl.tiposDenuncia.getList()
        .then(function(list){
          var typeIndex = 0;
          ctrl.tiposDenunciaList = list;
          typeIndex = getCurrentTypeIndex(list);
          ctrl.tiposDenuncia.setDtype(typeIndex);
        });
    }

    function getCurrentTypeIndex(types){
      var currentTypeSlug = $routeParams.type;
      var index = 0;
      for (var i=0; i<types.length; i++) {
        if ( types[i].fields.slug === currentTypeSlug ) {
          index = i;
          break;
        }
      }
      return index;

    }

    function setDate(){
      var date = new Date();
      var dateStr = $filter('date')(date,'dd/MM/yyyy');
      ctrl.currDate = dateStr;
    }

    function userChoice(choice){
      $scope.tiposDenuncia.changeState(choice);
    }

    function getUserSchool(cct){
      schoolsService.getSchool(cct).then(function(res){
        if(res.length > 0){
          ctrl.school = res[0];
        }
      });
    }

    function getDenuncia(){
      var token = userService.getToken() || 'eacbdcf80264f9a8405ede2c0f9037e7';
      denunciaService.getDenuncia(token).then(function(res){
        ctrl.getUserSchool(res.data.cct);
      });
    }

    $scope.$watch(
      function() {
        return $scope.tiposDenuncia.getCurrentState();
      },
      function(newVal) {
        ctrl.state = newVal;
      }
    );

  }

})();
