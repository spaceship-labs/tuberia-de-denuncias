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
      var state = tiposDenuncia.getCurrentState();
      state.should.exist.and.equal(false);
    });


    it('should load tipos-denuncia', function() {
      this.tiposJSON = fixture.load('tipos-denuncia.json');
      $httpBackend.expectGET('https://cdn.contentful.com:443/spaces/msnkbvgxrvah/entries?access_token=c3e13974fb72003886ab1f9151a883721f523e16f8143d95e92313ff1dd2c66e&content_type=1CQ8zB04qAuISUQwSEWUmA')
        .respond(this.tiposJSON);

      tiposDenuncia.getList();
      $httpBackend.flush();

    });

    it('should load tipo-denuncia infraestructura', function() {
      var typeId = '3JFuLY15te0mam6KeUu6kC';

      this.tipoJSON = fixture.load('tipo-denuncia-infraestructura.json');
      $httpBackend.expectGET('https://cdn.contentful.com:443/spaces/msnkbvgxrvah/entries?access_token=c3e13974fb72003886ab1f9151a883721f523e16f8143d95e92313ff1dd2c66e&sys.id='+typeId)
        .respond(this.tipoJSON);

      tiposDenuncia.getDenunciaType(typeId, {
        cct: '11EPR0657X',
        email: 'some@some.com',
        token: 'd1003a4ffafd0715faf737fdb9d3a77a',
        id: '56a6f34cd65dfb384344f793',
        history: [{
          index: 0,
          number: 1
        }]
      });
      $httpBackend.flush();

    });


    it('should return the current state', function() {
      var state = tiposDenuncia.getCurrentState();
      state.should.exist.and.be.an('object');
    });



  });


  describe('changeState', function() {
    it('should advance to the next step and add one to the history', function() {
      tiposDenuncia.changeState(0, 0);
      var state = tiposDenuncia.getCurrentState();
      state.should.exist.and.be.an.object;
    });
  });


  describe('history', function() {
    it('should have set two items in the history', function() {
      var history = tiposDenuncia.getHistory();
      history.should.exist.and.be.an('array').and.have.length(2);
    });
  });

  describe('list',function(){
    it('should return a list',function(){
      var list = tiposDenuncia.getCurrentList();
      list.should.exist.and.be.an('array').and.have.length(2);
    });
  });



});
