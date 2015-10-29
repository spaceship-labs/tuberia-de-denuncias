'use strict';

describe('Service: denunciaService', function () {

  //fixtures
  before(function() {
    fixture.setBase('test/fixtures');
  });

  // load the service's module
  beforeEach(module('tuberiaPrototypeApp'));

  // instantiate service
  var denunciaService, $httpBackend;

  beforeEach(inject(function (_$httpBackend_, _denunciaService_) {
    denunciaService = _denunciaService_;
    $httpBackend = _$httpBackend_;
  }));

  /*it('should do something', function () {
    expect(!!denunciaService).toBe(true);
  });*/

  /*describe('denuncia', function() {

    it('should create denuncia', function() {
      this.denunciaCreated = fixture.load('denuncia-create.json');

      var data = {
        email:"test@test.com",
        nombre:"test",
        apellido:"test"
      };

      var params = angular.toJson({data:data});

      $httpBackend.expectPOST('http://mte.spaceshiplabs.com/api/create_denuncia',params)
      //$httpBackend.expectGET('http://mte.spaceshiplabs.com/api/create_denuncia?data={"email":"test@test.com","nombre":"test","apellido":"test"}')
        .respond(this.denunciaCreated);

      denunciaService.createDenuncia(data);
      $httpBackend.flush();

    });

  });*/

});
