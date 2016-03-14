'use strict';

/**
 * @ngdoc filter
 * @name tuberiaPrototypeApp.filter:denunciaByConditions
 * @function
 * @description
 * # denunciaByConditions
 * Filter in the tuberiaPrototypeApp.
 */
angular.module('tuberiaPrototypeApp')
  .filter('denunciaByConditions', function () {
    return function (items, conditions) {
      if (items.length === 1) {
        return items[0];
      }
      //conditions = conditions || {};
      function check(item){
        var conditional = item && item.fields && item.fields.conditional;
        if (conditional && conditions) {
          var cond = true;
          Object.keys(conditional).forEach(function(key){
            if (conditional[key] !== conditions[key]) {
              cond = false;
            }
          });
          return cond;
        }
      }

      var filtered = items.filter(check);
      return filtered.length && filtered[0] || items[0];
    };
  });
