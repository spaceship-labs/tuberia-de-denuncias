'use strict';

/**
 * @ngdoc function
 * @name tuberiaPrototypeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tuberiaPrototypeApp
 */
angular.module('tuberiaPrototypeApp')
  .controller('MainCtrl', function ($scope,$mdSidenav,tiposDenuncia) {

  	tiposDenuncia.getList().then(function(tipos){
  		$scope.tiposDenuncia = 	tipos;
  	}); 	

  	$scope.acciones = [1,2,3];
	
	$scope.toggleSidebar = function() {
		$mdSidenav('left').open();
	};   

	$scope.closeSidebar = function() {
		$mdSidenav('left').close();
	}; 

  });
