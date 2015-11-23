'use strict';

/**
 * @ngdoc directive
 * @name tuberiaPrototypeApp.directive:mailSignIn
 * @description
 * # mailSignIn
 */
angular.module('tuberiaPrototypeApp')
  .directive('mailSignIn', function ($location, denunciaService, userService) {
    return {
      scope:{
        headerModal: '=',
        showModal: '=',
        create: '=',
        params: '=',
        closeOption: '=',
        closeOptionCb: '&'
      },
      templateUrl: 'views/directives/mailsignin.html',
      restrict: 'EA',
      link: function(scope){

        scope.user = {
          email: ''
        };

        scope.createDenuncia = function(data){
          denunciaService.createDenuncia(data).then(function(res){
            if(res.data.success){
              userService.setToken(res.data.token);
              $location.path('/caso/'+res.data.token);
            }else{
              scope.showError = true;
            }
            scope.loading = false;
          });
        };

        scope.exportDenuncias = function(email){
          denunciaService.exportDenuncias(email).then(function(res){
            if(res.data.success){
              scope.showExportMsg = true;
              scope.totalDenuncias = res.data.total;
            }else{
              scope.showError = true;
            }
            scope.loading = false;
          });
        };

        scope.submitForm = function(){
          scope.loading = true;
          scope.showError = false;

          if(scope.create){
            scope.params.email = scope.user.email;
            scope.createDenuncia(scope.params);
          }
          else{
            console.log('exportando');
            scope.exportDenuncias(scope.user.email);
          }
        };

      }
    };
  });
