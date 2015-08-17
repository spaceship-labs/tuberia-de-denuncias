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
    'contentful'
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
      space: 'zji58geajpv6',
      accessToken: '9117c7fd6ba20257f93f05aeb7fff17f2b0a4a58f8a00f7afe8af0569a55debe'
    });
  });
