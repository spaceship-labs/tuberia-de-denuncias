/*jshint expr: true*/
'use strict';

describe('Service: tiposDenuncia', function() {

  // instantiate service
  var tiposDenuncia,
    $httpBackend;

  //fixtures
  before(function() {
    fixture.setBase('test/fixtures');
  });


  // load the service's module
  beforeEach(module('tuberiaPrototypeApp'));


  //Inject Controller
  beforeEach(
    inject(function(_$httpBackend_, _tiposDenuncia_) {
      tiposDenuncia = _tiposDenuncia_;
      $httpBackend = _$httpBackend_;
    })
  );

  describe('currentState', function() {

    it('should return false when list is not set', function() {
      var state = tiposDenuncia.currentState();
      state.should.exist.and.equal(false);
    });

    it('should load tipos-denuncia', function(done) {
      this.tiposJSON = fixture.load('tipos-denuncia.json');
      $httpBackend.expectGET('tipos-denuncia.json').respond(this.tiposJSON);
      $httpBackend.flush();
      done();
    });

    it('should return the current state', function() {
      var state = tiposDenuncia.currentState();
      state.should.exist.and.be.an('object');
    });

  });


  describe('changeState',function(){
    it('should advance to the next step and add one to the history',function(){
      tiposDenuncia.changeState(0);
      var state = tiposDenuncia.currentState();
      state.should.exist.and.be.an.object;
      state.variables.content.should.equal('realizar-reporte-telefonico.md');
    });
  });


  describe('history', function() {
    it('should return empty array when list not set', function() {
      var history = tiposDenuncia.history();
      history.should.exist.and.be.an('array').and.have.length(2);
    });
  });


});
