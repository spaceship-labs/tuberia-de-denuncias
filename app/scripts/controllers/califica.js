'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CalificaCtrl
 * @description
 * # CalificaCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CalificaCtrl', function ($scope, $routeParams, $anchorScroll, $location, contentfulApi, schoolsService) {
    var token = $routeParams.token;
    if (!token) {
      return;
    }

    $scope.total = 0;
    contentfulApi.getQuestions('3iL6jJaboci2qyCMiWY4ke').then(function(questions) {
      console.log('setQ');
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

    $scope.score = function () {
      console.log('score');
      var scores = $scope.questions.map(function(q) {
        console.log('q', q);
        return {
          question: q.fields.text,
          score: q.mark,
          anchor: q.sys.id
        };
      });

      var empty = scores.filter(function (s) {
        return !s.score;
      });

      if ( empty.length  ) {
        console.log('falta', empty[0].anchor);
        var current = $location.hash();
        $location.hash(empty[0].anchor);
        $anchorScroll();
        $location.hash(current);
        return ;
      }
      console.log($scope.comment);
      schoolsService.setScore(token, scores, $scope.comment).then(function (res) {
        console.log('res', res);
        //show msg.
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



  });
