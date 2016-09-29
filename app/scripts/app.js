'use strict';

/**
 * @ngdoc overview
 * @name tuberiaPrototypeApp
 * @description
 * # tuberiaPrototypeApp
 *
 * Main module of the application.
 */
(function(){

  var base = window && window.document.getElementsByTagName('base');
  var baseData = base.length && base[0].getAttribute('href');

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
    .config(function($routeProvider) {
      //$locationProvider.html5Mode(true);
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })
        .when('/caso/:token', {
          templateUrl: 'views/caso.html',
          controller: 'CasoCtrl',
          controllerAs: 'caso'
        })
        .when('/conoce', {
          templateUrl: 'views/conoce.html',
          controller: 'ConoceCtrl',
          controllerAs: 'conoce'
        })
        .when('/quienes-somos', {
          templateUrl: 'views/quienes-somos.html',
          controller: 'QuienesSomosCtrl',
          controllerAs: 'quienesSomos'
        })
        .when('/preguntas-frecuentes', {
          templateUrl: 'views/preguntas-frecuentes.html',
          controller: 'PreguntasFrecuentesCtrl',
          controllerAs: 'preguntasFrecuentes'
        })
        .when('/aviso-de-privacidad', {
          templateUrl: 'views/aviso-de-privacidad.html',
          controller: 'AvisoDePrivacidadCtrl',
          controllerAs: 'avisoDePrivacidad'
        })
        .when('/contacto', {
          templateUrl: 'views/contacto.html',
          controller: 'ContactoCtrl',
          controllerAs: 'contacto'
        })
        .when('/califica/:token', {
          templateUrl: 'views/califica.html',
          controller: 'CalificaCtrl',
          controllerAs: 'califica'
        })
        .when('/califica', {
          templateUrl: 'views/califica-empty.html',
          controller: 'CalificaEmptyCtrl',
          controllerAs: 'calificaEmpty'
        })
        .when('/reporta', {
          templateUrl: 'views/reporta.html',
          controller: 'ReportaCtrl',
          controllerAs: 'reporta'
        })
        .when('/haznoslo-saber', {
          templateUrl: 'views/haznoslo-saber.html',
          controller: 'HaznosloSaberCtrl',
          controllerAs: 'haznosloSaber'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
    .config(function(contentfulProvider) {
      contentfulProvider.setOptions({
        space: 'msnkbvgxrvah',
        //accessToken: 'c3e13974fb72003886ab1f9151a883721f523e16f8143d95e92313ff1dd2c66e', //production
        accessToken : '2ccc4f0f4454bbfdd2845dc3027f1b2da0afbf11d00d9c0de03609d70d657d14', //sandbox (includes unpublished content)
        host: 'preview.contentful.com', //user for sandbox hosts
      });
    }).value('entityIdsAvailable', ['9', '15', '19', '14', '21'])
      .value('URLAPIMODEPROD', ( baseData === '/ventanilla-escolar/'));
    /*
      9 | DISTRITO FEDERAL
      15 | México
      19 | Nuevo León -- dfc430c512c79608f1722521751e1af5
      14 | JALISCO -- 2326d5b76e5f5f3ea56dce4127da85d7
      21 | PUEBLA -- 68de41215a56006711cbc1a0db19a8fe

    */

})();

