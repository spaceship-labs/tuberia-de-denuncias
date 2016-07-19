'use strict';

/**
 * @ngdoc service
 * @name tuberiaPrototypeApp.contentfulApi
 * @description
 * # contentfulApi
 * Service in the tuberiaPrototypeApp.
 */
angular.module('tuberiaPrototypeApp')
  .service('contentfulApi', function (contentful, $q) {
    var api = this;

    api.getQuestions = function(category) {
      var deferred = $q.defer();
      function log(l) {
        console.log.apply(console, [l]);
      }
      contentful.entries('content_type=question&order=sys.createdAt').then(function(res) {
        var items = res.data.items;
        if (category) {
          var items = items.filter(function (item) {
            return item.fields.category.sys.id === category
          });
        }
        items.push({
          fields: {
            text: '¿Qué tan útil para solucionar tu problema fue la información de Ventanilla Escolar?'
          }
        });

        deferred.resolve(items);
      });

      return deferred.promise;
    };

  });
