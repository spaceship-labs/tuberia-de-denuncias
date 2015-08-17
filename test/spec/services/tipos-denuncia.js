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
      $httpBackend.expectGET('https://cdn.contentful.com:443/spaces/zji58geajpv6/entries?access_token=9117c7fd6ba20257f93f05aeb7fff17f2b0a4a58f8a00f7afe8af0569a55debe&content_type=1CQ8zB04qAuISUQwSEWUmA')
        .respond(this.tiposJSON);
      $httpBackend.flush();
      done();
    });

    it('should return the current state', function() {
      var state = tiposDenuncia.currentState();
      state.should.exist.and.be.an('object');
    });

  });


  describe('changeState', function() {
    it('should advance to the next step and add one to the history', function() {
      tiposDenuncia.changeState(0);
      var state = tiposDenuncia.currentState();
      state.should.exist.and.be.an.object;
    });
  });


  describe('history', function() {
    it('should have set two items in the history', function() {
      var history = tiposDenuncia.history();
      history.should.exist.and.be.an('array').and.have.length(2);
    });
  });

  describe('list',function(){
    it('should return a list',function(){
      var list = tiposDenuncia.list();
      list.should.exist.and.be.an('array').and.have.length(2);
    });
  });


});
