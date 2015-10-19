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
        if(item.fields.parameters && item.fields.parameters.control){
          return item.fields.parameters.control === control;
        }
        return true;
      }

      var filtered = items.filter(itemControl);
      return filtered;
    };
  });
