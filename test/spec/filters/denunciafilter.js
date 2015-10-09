'use strict';

describe('Filter: denunciaFilter', function () {

  // load the filter's module
  beforeEach(module('tuberiaPrototypeApp'));

  // initialize a new instance of the filter before each test
  var denunciaFilter;
  beforeEach(inject(function ($filter) {
    denunciaFilter = $filter('denunciaFilter');
  }));


});
