'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.userService
 * @description
 * # userService
 * Service in the tuberiaPrototypeApp.
 */
(function(){

  angular.module('tuberiaPrototypeApp')
    .service('userService', function () {
      var cookieBaseName = 'tuberia.user';
      this.setToken = setToken;
      this.getToken = getToken;

      function setToken(token){
        var cookieName = cookieBaseName + '.token';
        localStorage.setItem(cookieName, token);
      }

      function getToken(){
        var cookieName = cookieBaseName + '.token';
        console.log(localStorage[cookieName]);
        return localStorage[cookieName];
      }

    });

})();
