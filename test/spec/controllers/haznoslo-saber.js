'use strict';

describe('Controller: HaznosloSaberCtrl', function () {

  // load the controller's module
  beforeEach(module('tuberiaPrototypeApp'));

  var HaznosloSaberCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HaznosloSaberCtrl = $controller('HaznosloSaberCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HaznosloSaberCtrl.awesomeThings.length).toBe(3);
  });
});
