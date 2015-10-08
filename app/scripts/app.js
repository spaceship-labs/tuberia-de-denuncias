'use strict';

/**
 * @ngdoc overview
 * @name tuberiaPrototypeApp
 * @description
 * # tuberiaPrototypeApp
 *
 * Main module of the application.
 */
angular
  .module('tuberiaPrototypeApp', [
    'ngAnimate',
    'ngAria',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'btford.markdown',
    'contentful',
    'ngCookies'
  ])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/caso/:type', {
        templateUrl: 'views/caso.html',
        controller: 'CasoCtrl',
        controllerAs: 'caso'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(contentfulProvider) {
    contentfulProvider.setOptions({
      space: 'msnkbvgxrvah',
      accessToken: 'c3e13974fb72003886ab1f9151a883721f523e16f8143d95e92313ff1dd2c66e'
    });
  });
