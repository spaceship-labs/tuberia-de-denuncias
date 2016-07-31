'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tuberiaPrototypeApp
 */
(function(){

  function MainCtrl($scope, $mdSidenav, $location, tiposDenuncia, schoolsService, $routeParams, $mdDialog){
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


      $scope.sidebarOn = false;
      $scope.reportaOn = false;
      $scope.calificaOn = false;
      $scope.conoceOn = false;
      if (path.indexOf('/caso/') >= 0) {
        $scope.sidebarOn = true;
      } else if (path.indexOf('/califica') !== -1) {
        $scope.calificaOn = true;
      } else if (path.indexOf('/reporta') >= 0) {
        $scope.reportaOn = true;
      } else if (path.indexOf('/conoce') >= 0){
        $scope.sidebarOn =  true;
        $scope.conoceOn = true;
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

    $scope.toSectionWithToken = function(section, otherwise) {
      console.log($location.path());
      var path = $location.path();

      if (path.indexOf('/caso/') === 0 && $routeParams.token) {

        var confirm = $mdDialog.confirm()
          .title('Calificar')
          .content('Una vez que hayas concluido tu reporte, te invitamos que califiques algunos aspectos de la atención que recibiste. Las calificaciones ayudan a detectar áreas de mejora y a reconocer los logros alcanzados')
          .ariaLabel('')
          .ok('Continuar a calificar')
          .cancel('Continuar con el reporte');

        $mdDialog.show(confirm).then(function() {
          return $location.path(section + $routeParams.token);
        }, function() {
          //...
        });

        return ;
      }

      if ($routeParams.token) { //WTF!!!
        return $location.path(section + $routeParams.token);
      }
      $location.path(otherwise || section);
    };

  }

  MainCtrl.$inject = ['$scope','$mdSidenav','$location','tiposDenuncia','schoolsService', '$routeParams', '$mdDialog'];
  angular.module('tuberiaPrototypeApp').controller('MainCtrl', MainCtrl);

})();
