'use strict';

/**
 * @ngdoc directive
 * @name tuberiaPrototypeApp.directive:ga
 * @description
 * # ga
 */
angular.module('tuberiaPrototypeApp')
  .directive('ga', function () {
    return {
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {
        var command = $attrs.ga;
        var onEvent = function() {
          if (command) {
            if (command[0] === '\'') {
              command = '[' + command + ']';
            }
            command = $scope.$eval(command);
          }
          ga.apply(null, command);
        };
        $element.bind('click', onEvent);
      }
    };
  });
