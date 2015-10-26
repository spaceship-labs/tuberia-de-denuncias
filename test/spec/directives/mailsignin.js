'use strict';

describe('Directive: mailSignIn', function () {

  // load the directive's module
  beforeEach(module('tuberiaPrototypeApp'));

  /*var element,
    scope;
  */
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mail-sign-in></mail-sign-in>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mailSignIn directive');
  }));*/
});
