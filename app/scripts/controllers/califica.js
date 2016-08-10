'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:CalificaCtrl
 * @description
 * # CalificaCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('CalificaCtrl', function ($scope, $routeParams, $anchorScroll, $location, contentfulApi, schoolsService, denunciaService) {
    var token = $routeParams.token;
    if (!token) {
      return;
    }

    $scope.loading = true;

    function loadDenunce() {
      denunciaService.getDenuncia(token).then(function(res){
        $scope.history = res.data.history.map(function(h) {
          return h.stepId;
        });
        $scope.tiposDenuncia.getDenunciaType(res.data.dTypeId).then(function(data){
          data.fields.questions.push({
            fields: {
              text: '¿Qué tan útil para solucionar tu problema fue la información de Ventanilla Escolar?'
            },
            sys: {
              id: 'quetanutilpara'
            }
          });
          loadQuestions(data.fields.questions);
        });
      });
    }

    loadDenunce();


    function loadQuestions(questions) {
      $scope.total = 0;
      $scope.questions = questions.filter(filterQuestions);
      schoolsService.getScore(token).then(loadScores);
    }

    function filterQuestions(question) {
      if (question && question.fields.steps) {
        return question.fields.steps.filter(function (s) {
          var id = ""+s;
          return $scope.history.indexOf(id) !== -1;
        }).length;

      } else if (question.sys.id === 'quetanutilpara') {
          return true;
      }
    }


    function loadScores(res) {
      if (res && res.data && res.data.preguntas) {
        var pre = res.data.preguntas;
        $scope.questions = $scope.questions.map(function(ques) {
          var p = pre[ques.sys.id];
          if (p) {
            ques.mark = p.calificacion;
            ques.pid = p.pid;
          }
          return ques;
        });
        $scope.sumTotal();
      }

      if (res && res.data && res.data.comentario) {
        $scope.comment = res.data.comentario || {};
      }
      $scope.loading = false;
    }

    $scope.sumTotal = function () {
      var total = 0;
      $scope.questions.forEach(function(ques) {
        total += ques.mark || 0;
      });
      total /= $scope.questions.length;

      $scope.total = total;
    };

    $scope.score = function () {
      var scores = $scope.questions.map(function(q) {
        return {
          question: q.fields.text,
          score: q.mark,
          uuid: q.sys.id,
          pid: q.pid
        };
      });

      var empty = scores.filter(function (s) {
        return !s.score;
      });

      if ( empty.length  ) {
        var current = $location.hash();
        $location.hash(empty[0].uuid);
        $anchorScroll();
        $location.hash(current);
        return ;
      }

      schoolsService.setScore(token, scores, $scope.comment).then(function () {
        $scope.success = true;
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



  });
