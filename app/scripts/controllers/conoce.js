'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:ConoceCtrl
 * @description
 * # ConoceCtrl
 * Controller of the tuberiaPrototypeApp
 */
function ConoceCtrl($scope ,$location, $filter, schoolsService, denunciaService){
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
    ctrl.params.dTypeId = dType.sys.id;
    ctrl.params.cct = ctrl.selectedSchool.cct;
  }

  function getCurrentDType(){
    var arr = ctrl.selectedCategory.fields.denuncias;
    var control = ctrl.selectedSchool.control;
    var types = $filter('denunciaFilter')(arr, control);
    if(types.length > 0){
      return types[0];
    }
    return false;
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

}

ConoceCtrl.$inject = ['$scope', '$location','$filter','schoolsService', 'denunciaService'];
angular.module('tuberiaPrototypeApp')
  .controller('ConoceCtrl',ConoceCtrl);
