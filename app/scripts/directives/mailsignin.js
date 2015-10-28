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
        params: '='
      },
      templateUrl: 'views/directives/mailsignin.html',
      restrict: 'EA',
      link: function(scope){

        /*scope.submitMailSignIn = function(url){
          ctrl.toggleMailSignIn = true;
          $location.path(url);
        }*/

        scope.createDenuncia = function(data, callback){
          denunciaService.createDenuncia(data).then(function(res){
            callback(res);
          });
        };

        scope.submitForm = function(){
          scope.loading = true;
          scope.showError = false;

          if(scope.create){
            scope.createDenuncia(scope.params,function(res){
              console.log(res);

              if(res.data.success){
                userService.setToken(res.data.token);
                $location.path('/caso/'+res.data.dType);
              }else{
                scope.showError = true;
              }
              scope.loading = false;
            });

          }else{
            scope.loading = false;
            scope.showError = true;
          }
        };

      }
    };
  });
