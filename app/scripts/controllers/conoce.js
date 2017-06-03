'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:ConoceCtrl
 * @description
 * # ConoceCtrl
 * Controller of the tuberiaPrototypeApp
 */
function ConoceCtrl($scope ,$location, $filter, $mdDialog, $routeParams, schoolsService, denunciaService, entityIdsAvailable){
  var ctrl = this;
  ctrl.searchText = '';
  ctrl.categories = [];
  ctrl.user = {};
  ctrl.indexCategory = 0;
  ctrl.selectedCategory = {};
  ctrl.tiposDenuncia = $scope.tiposDenuncia;
  ctrl.icons = $scope.icons;
  ctrl.toggleMailSignIn = false;
  ctrl.toggleForm = false;
  ctrl.createDenunciaLoading = false;
  ctrl.params = {};

  ctrl.getSchools = getSchools;
  ctrl.setSelectedSchool = setSelectedSchool;
  ctrl.removeSelectedSchool = removeSelectedSchool;
  ctrl.getCategories = getCategories;
  ctrl.setSelectedCategory = setSelectedCategory;
  ctrl.startReport = startReport;
  ctrl.createDenuncia = createDenuncia;
  ctrl.setUpParams = setUpParams;
  ctrl.getCurrentDType = getCurrentDType;
  ctrl.validateFields = validateFields;
  ctrl.init = init;

  ctrl.preSelectedSchool = $routeParams.cct;

  if (ctrl.preSelectedSchool) {
    ctrl.toggleForm = true;
    schoolsService.getSchools("", {oneCCT: ctrl.preSelectedSchool, solr: true}).then(function(res) {
      if (res && res.length) {
        ctrl.selectedSchool = res[0];
        ctrl.setSelectedSchool();
      }
    });
  }

  function getCategories(){
    ctrl.tiposDenuncia.getCategories()
      .then(function(data){
        ctrl.categories = data;
        ctrl.selectedCategory = ctrl.categories[ctrl.indexCategory];
      });
  }

  function setSelectedCategory(index){
    ctrl.indexCategory = index;
    ctrl.selectedCategory = ctrl.categories[ctrl.indexCategory];
  }

  function getSchools(name) {
    return schoolsService.getSchools(name)
      .then(function(data){
        //console.log(data);
        return data;
      });
  }

  function setSelectedSchool(){
    if(ctrl.selectedSchool){
      schoolsService.setUserSchool(ctrl.selectedSchool);
    }
  }
  function removeSelectedSchool(){
    ctrl.selectedSchool = {};
  }

  function init(){
    ctrl.getCategories();
  }

  /*function startReport(dType){
    //ctrl.toggleMailSignIn = true;
    ctrl.setUpParams();
  }*/
  function startReport(){
    ctrl.setUpParams();
  }

  function setUpParams(dType){
    ctrl.params.startDate = new Date();
    ctrl.params.dTypeSlug = dType.fields.slug;
    ctrl.params.label = dType.fields.label;
    ctrl.params.dTypeId = dType.sys.id;
    ctrl.params.cct = ctrl.selectedSchool.cct;
    ctrl.params.entidadId = ctrl.selectedSchool.entidad;
    ctrl.params.nivelName = ctrl.selectedSchool.nom_nivel;
  }

  function getCurrentDType(){
    var arr = ctrl.selectedCategory.fields.denuncias;
    var conditions = {
      entidadId: ctrl.selectedSchool.entidad,
      controlId: ctrl.selectedSchool.control,
      nivelId: ctrl.selectedSchool.nivel
    };
    return $filter('denunciaByConditions')(arr, conditions);
  }

  function validateFields(keys,model){
    for(var i=0;i<keys.length;i++){
      if(typeof model[keys[i]] === 'undefined' || model[keys[i]] === '' || model[keys[i]] === false ){
        return false;
      }
    }
    return true;
  }

  function createDenuncia(){
    /*
    if (entityIdsAvailable && entityIdsAvailable.length) {
      var entityId = ctrl.selectedSchool && ctrl.selectedSchool.entidad || '';
      if (entityIdsAvailable.indexOf(entityId.toString()) === -1) {
        showDialog();
        return console.log("failed", entityId);
      }
      console.log("success", entityId);
    }
    */


    ctrl.createDenunciaError = false;
    if(ctrl.selectedSchool && ctrl.validateFields(['email','name','occupation'],ctrl.user) ){
      var dType = ctrl.getCurrentDType();

      ctrl.setUpParams(dType);
      ctrl.params.email = ctrl.user.email;
      ctrl.params.userName = ctrl.user.name;
      ctrl.params.userOccupation = ctrl.user.occupation;
      var data = ctrl.params;

      ctrl.createDenunciaLoading = true;
      data.history = [{
        index: 0,
        number: 1
      }];
      denunciaService.createDenuncia(data).then(function(res){
        if(res.data.success){
          $location.path('/caso/'+res.data.token);
        }else{
          ctrl.createDenunciaError = true;
        }
        ctrl.createDenunciaLoading = false;
      });
    }else{
      ctrl.createDenunciaError = true;
    }
  }

  ctrl.init();

  function showDialog() {
    var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        templateUrl: 'views/no-disponible.html',
        controller: DialogController,
        locals: {
          school: ctrl.selectedSchool,
          userForm: ctrl.user
        }
      });

      function DialogController($scope, $mdDialog, schoolsService, school, userForm) {
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };

        $scope.userForm = {
          email: userForm.email,
          estado: school.nom_entidad,
          entity: school.entidad,
          cct: school.cct
        };
        var send = false;
        $scope.notifies_available = function(form) {
          if ($scope.send) {
            $scope.closeDialog();
            return;
          }

          if (send) {
            return;
          }
          send = true;
          schoolsService.notifiesAvailable(form).then(function(res) {
            if (res.data && res.data.success) {
              $scope.send = true;
              send = false;
            }
          });
        };
    }
  }

  $scope.anchorTo = function(name) {
    var anchor = document.querySelector('.'+name);
    if (anchor) {
      document.querySelector('body').scrollTop = anchor.offsetTop + 350;
    }
  };


  //showDialog();
}

ConoceCtrl.$inject = ['$scope', '$location','$filter', '$mdDialog', '$routeParams', 'schoolsService', 'denunciaService', 'entityIdsAvailable'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl', ConoceCtrl);
