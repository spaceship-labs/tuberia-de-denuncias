'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CalificaCtrl
 * @description
 * # CalificaCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CalificaCtrl', function ($scope) {

    $scope.questions = [{
      title: 'This is a ...',
      text: 'pregunta uno',
      max: 'muy bien',
      min: "muy mal",
    },{
      title: 'This is a two ...',
      text: 'pregunta dos',
      max: 'muy bien',
      min: "muy mal",
    },
    {
      title: 'This is a two ...',
      text: 'pregunta dos',
      max: 'muy bien',
      min: "muy mal",
    },
    {
      title: 'This is a two ...',
      text: 'pregunta dos',
      max: 'muy bien',
      min: "muy mal",
    },

    ];


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
