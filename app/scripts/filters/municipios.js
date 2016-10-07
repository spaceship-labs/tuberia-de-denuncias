'use strict';

/**
 * @ngdoc filter
 * @name tuberiaPrototypeApp.filter:municipios
 * @function
 * @description
 * # municipios
 * Filter in the tuberiaPrototypeApp.
 */
angular.module('tuberiaPrototypeApp').filter('municipiosFilter', function () {
  return function (municipios, entidad) {
    if (!entidad) {
      return municipios;
    }
    return municipios.filter(function (mun) {
      return !entidad.id || !mun.entidad || mun.entidad.id === entidad.id;
    });
  };
});

