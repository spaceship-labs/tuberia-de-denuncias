'use strict';

describe('Filter: municipios', function () {

  // load the filter's module
  beforeEach(module('tuberiaPrototypeApp'));

  // initialize a new instance of the filter before each test
  var municipios;
  beforeEach(inject(function ($filter) {
    municipios = $filter('municipios');
  }));

  it('should return the input prefixed with "municipios filter:"', function () {
    var text = 'angularjs';
    expect(municipios(text)).toBe('municipios filter: ' + text);
  });

});
