'use strict';

describe('Controller: ConoceCtrl', function () {

  // load the controller's module
  beforeEach(module('tuberiaPrototypeApp'));

  var ConoceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConoceCtrl = $controller('ConoceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
