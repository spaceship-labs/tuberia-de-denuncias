'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:BuscadorCtrl
 * @description
 * # BuscadorCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('BuscadorCtrl', function ($scope, $location, schoolsService, staticData) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ctrl = this;
    ctrl.filters = staticData;
    ctrl.localidades = [];
    ctrl.form = {};

    ctrl.searchText = function(search) {
      if (search && search !== "") {
        return schoolsService.getSchools(search);
      }

      return [];
    };

    ctrl.reloadSearch = function(page) {
      console.log('form', ctrl.form);
      ctrl.loading = true;
      var params = {
        p: page || 1,
        sort: "Semáforo educativo",
        type_test: "planea"
      };

      Object.keys(ctrl.form).forEach(function(key){
        var data = ctrl.form[key];
        params[key] = data && data.id || null;
      });

      schoolsService.getSchools("", params).then(function(res) {
        console.log('r', res, params);
        ctrl.loading = false;
        ctrl.schools = res;
      });
    };

    ctrl.loadLocalidades = function(){
      ctrl.localidades = [];
      var entidad = ctrl.form.entidad && ctrl.form.entidad.id || null;
      var municipio = ctrl.form.municipio && ctrl.form.municipio.id || null;
      return schoolsService.getLocalidades(entidad, municipio).then(function(res){
        if (res && res.data && res.data.pop) {
          ctrl.localidades = res.data;
        }
      });
    };

    ctrl.goToPage = function(page) {
      var prev = ['Primeras', '<'],
          post = ['>', 'Últimas'],
          goto = page;

      if (page === '>') {
        goto = ctrl.pages[2] + 1;
      } else if (page === 'Últimas') {
        goto = ctrl.schools.totalPages;
      } else if (page === 'Primeras') {
        goto = 1;
      } else if (page === '<') {
        goto = ctrl.pages[2] - 1;
      }

      if (parseInt(goto)) {
        ctrl.reloadSearch(goto);
        var pages;
        if (goto <= 2) {
          pages = [1, 2, 3, '>', 'Últimas'];
        }else if (goto >= 3) {
          pages = prev.concat([goto-1, goto]);
          if (goto < ctrl.schools.totalPages) {
            pages.push(goto+1);
          }
          if (goto+3<ctrl.schools.totalPages) {
            pages = pages.concat(post);
          }
        }

        if (pages) {
          ctrl.pages = pages;
        }

      }

    };


    ctrl.reloadSearch();
    ctrl.pages = [1,2,3, '>', 'Últimas'];

    ctrl.setSelectedSchool = function() {
      if (ctrl.selectedSchool) {
        $location.path('/conoce/'+ctrl.selectedSchool.cct);
      }
    };

    ctrl.getSchools = schoolsService.getSchools;
  });
