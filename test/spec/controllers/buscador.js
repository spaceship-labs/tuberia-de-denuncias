'use strict';

describe('Controller: BuscadorCtrl', function () {

  // load the controller's module
  beforeEach(module('tuberiaPrototypeApp'));

  var BuscadorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BuscadorCtrl = $controller('BuscadorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(BuscadorCtrl.awesomeThings.length).toBe(3);
  });
  */
});
