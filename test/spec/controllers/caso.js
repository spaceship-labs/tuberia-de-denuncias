'use strict';

describe('Controller: CasoCtrl', function () {

  // load the controller's module
  beforeEach(module('tuberiaPrototypeApp'));

  var CasoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CasoCtrl = $controller('CasoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(CasoCtrl.awesomeThings.length).toBe(3);
  });
});
