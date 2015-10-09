'use strict';

/**
 * @ngdoc filter
 * @name tuberiaPrototypeApp.filter:denunciaFilter
 * @function
 * @description
 * # denunciaFilter
 * Filter in the tuberiaPrototypeApp.
 */
angular.module('tuberiaPrototypeApp')
  .filter('denunciaFilter', function () {
    return function (items, control) {

      function itemControl(item){
        return item.fields.parameters.control === control;
      }

      var filtered = items.filter(itemControl);
      return filtered;
    };
  });
