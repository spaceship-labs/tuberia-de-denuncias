'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CalificaCtrl
 * @description
 * # CalificaCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CalificaCtrl', function ($scope, $routeParams, contentfulApi) {
    var token = $routeParams.token;
    if (!token) {
      return;
    }

    $scope.total = 0;
    contentfulApi.getQuestions('3iL6jJaboci2qyCMiWY4ke').then(function(questions) {
      $scope.questions = questions;
    });

    $scope.sumTotal = function () {
      var total = 0;
      $scope.questions.forEach(function(ques) {
        total += ques.mark || 0;
      });
      total /= $scope.questions.length;

      $scope.total = total;
    };


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



  });
