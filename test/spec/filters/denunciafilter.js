'use strict';

describe('Filter: denunciaFilter', function () {

  // load the filter's module
  beforeEach(module('tuberiaPrototypeApp'));

  // initialize a new instance of the filter before each test
  var denunciaFilter;
  beforeEach(inject(function ($filter) {
    denunciaFilter = $filter('denunciaFilter');
  }));

  it('should return the input prefixed with "denunciaFilter filter:"', function () {
    var text = 'angularjs';
    expect(denunciaFilter(text)).toBe('denunciaFilter filter: ' + text);
  });

});
