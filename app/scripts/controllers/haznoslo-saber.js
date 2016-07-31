'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:HaznosloSaberCtrl
 * @description
 * # HaznosloSaberCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('HaznosloSaberCtrl', function ($scope, tiposDenuncia, schoolsService, $mdDialog) {
    tiposDenuncia.getCategories().then(loadCats);

    function loadCats(res) {
      $scope.denunces = res || [];
    }

    $scope.entities = [
        {id: 1, label: 'AGUASCALIENTES'},
        {id: 2, label: 'BAJA CALIFORNIA' },
        {id: 3,  label: 'BAJA CALIFORNIA SUR '},
        {id: 4,  label: 'CAMPECHE            '},
        {id: 5,  label: 'COAHUILA DE ZARAGOZA'},
        {id: 6,  label: 'COLIMA              '},
        {id: 7,  label: 'CHIAPAS             '},
        {id: 8,  label: 'CHIHUAHUA           '},
        {id: 9,  label: 'DISTRITO FEDERAL    '},
        {id: 10, label: 'DURANGO             '},
        {id: 11, label: 'GUANAJUATO          '},
        {id: 12, label: 'GUERRERO            '},
        {id: 13, label: 'HIDALGO             '},
        {id: 14, label: 'JALISCO             '},
        {id: 15, label: 'México          '},
        {id: 16, label: 'Michoacán       '},
        {id: 17, label: 'MORELOS             '},
        {id: 18, label: 'NAYARIT             '},
        {id: 19, label: 'Nuevo León      '},
        {id: 20, label: 'OAXACA              '},
        {id: 21, label: 'PUEBLA              '},
        {id: 22, label: 'Querétaro       '},
        {id: 23, label: 'QUINTANA ROO        '},
        {id: 24, label: 'San Luis Potosí '},
        {id: 25, label: 'SINALOA             '},
        {id: 26, label: 'SONORA              '},
        {id: 27, label: 'TABASCO             '},
        {id: 28, label: 'TAMAULIPAS          '},
        {id: 29, label: 'TLAXCALA            '},
        {id: 30, label: 'VERACRUZ            '},
        {id: 31, label: 'Yucatán         '},
        {id: 32, label: 'ZACATECAS           '},

    ];

    function showModal(msg) {
      var alert = $mdDialog.alert({
        title: 'Error',
        content: msg,
        ok: 'Aceptar'
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }

    $scope.send = function (form) {
      if (!form.type) {
        showModal('Selecciona un tipo de denuncia');
        return ;
      } else if (!form.entity) {
        showModal('Selecciona un estado');
        return ;
      }

      $scope.loading = true;
      schoolsService.informationFixed(form).then(function (res) {
        if (res.data && res.data.success) {
          $scope.success = true;
        } else {
          $scope.failed = true;
        }
        $scope.loading = false;
      });
    };

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
