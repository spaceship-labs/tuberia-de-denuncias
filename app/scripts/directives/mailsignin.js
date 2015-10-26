'use strict';

/**
 * @ngdoc directive
 * @name tuberiaPrototypeApp.directive:mailSignIn
 * @description
 * # mailSignIn
 */
angular.module('tuberiaPrototypeApp')
  .directive('mailSignIn', function () {
    return {
      scope:{
        headerModal: '=',
        showModal: '='
      },
      templateUrl: 'views/directives/mailsignin.html',
      restrict: 'EA'
    };
  });
