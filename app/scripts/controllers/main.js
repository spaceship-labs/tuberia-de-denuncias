'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tuberiaPrototypeApp
 */
(function(){

  function MainCtrl($scope, $mdSidenav, $location, tiposDenuncia, schoolsService, $routeParams){
    $scope.tiposDenuncia = tiposDenuncia;
    $scope.schoolsService = schoolsService;
    $scope.icons = {
      'acoso-df':'bullyng',
      'acoso-df-privada':'bullyng',
      'infraestructura':'edificio',
      'inasistencia-de-profesores': 'maestro',
      'cobro-de-cuotas':'director'
    };
    $scope.toggleMailSignInHeader = false;

    $scope.$on('$locationChangeStart', function() {
      var path = $location.path();

      $scope.toggleMailSignInHeader = false;

      if (path.indexOf('/caso/') >= 0 || path.indexOf('/conoce') >= 0) {
        $scope.sidebarOn = true;
        $scope.reportaOn = true;
        $scope.calificaOn = false;
      } else if (path.indexOf('/califica') !== -1) {
        $scope.reportaOn = false;
        $scope.sidebarOn = false;
        $scope.calificaOn = true;
      } else {
        $scope.sidebarOn = false;
        $scope.reportaOn = false;
        $scope.calificaOn = false;
      }
    });

    $scope.toggleSidebar = function() {
      $mdSidenav('left').open();
    };

    $scope.closeSidebar = function() {
      $mdSidenav('left').close();
    };

    $scope.toggleConoce = function(){
      $scope.toggleMailSignInHeader = !$scope.toggleMailSignInHeader;
    };

    $scope.toSectionWithToken = function(section) {
      if ($routeParams.token) { //WTF!!!
        return $location.path(section + $routeParams.token);
      }
      $location.path(section);
    };

  }

  MainCtrl.$inject = ['$scope','$mdSidenav','$location','tiposDenuncia','schoolsService', '$routeParams'];
  angular.module('tuberiaPrototypeApp').controller('MainCtrl', MainCtrl);

})();
