'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tuberiaPrototypeApp
 */
function MainCtrl($scope, $mdSidenav, $location, tiposDenuncia){
  $scope.tiposDenuncia = tiposDenuncia;
  $scope.$on('$locationChangeStart', function() {
    var path = $location.path();
    if(path.indexOf('/caso/') >= 0){
      $scope.onCaso = true;
    }else{
      $scope.onCaso = false;
    }
  });

  $scope.toggleSidebar = function() {
    $mdSidenav('left').open();
  };

  $scope.closeSidebar = function() {
    $mdSidenav('left').close();
  };
}

MainCtrl.$inject = ['$scope','$mdSidenav','$location','tiposDenuncia'];
angular.module('tuberiaPrototypeApp').controller('MainCtrl', MainCtrl);
