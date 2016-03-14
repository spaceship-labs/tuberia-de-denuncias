'use strict';

describe('Filter: denunciaByConditions', function () {

  // load the filter's module
  beforeEach(module('tuberiaPrototypeApp'));

  // initialize a new instance of the filter before each test
  var denunciaByConditions;
  beforeEach(inject(function ($filter) {
    denunciaByConditions = $filter('denunciaByConditions');
  }));

  var types;
  beforeEach(function(){
    types = [{
        fields: {
          slug: 'type1',
        },
        sys: {},
      }, {
        fields: {
          slug: 'type2',
          conditional: {
            entidadId: "2"
          }
        },
        sys: {}
      }
    ];
  });

  it('should return the first element if the zise is 1', function () {
    denunciaByConditions([1]).should.equal(1);
  });

  it('should return the first element if conditional is undefined', function(){
    denunciaByConditions([{s:1}, {s:2}]).should.eql({s:1});
  });

  it('should filter by conditions', function() {
    denunciaByConditions(types, {entidadId: "2"}).should.eql(types[1]);
  });

});
