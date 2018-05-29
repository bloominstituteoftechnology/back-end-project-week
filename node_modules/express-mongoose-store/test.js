var chai = require('chai')
  , expect = chai.expect
  , session = require('express-session')
  , mongoose = require('mongoose')
  , MongooseStore
  , store
  ;

//mongoose.set('debug', true);


describe('Test sessions', function(){
  before(function(done){
    MongooseStore = require('./index')(session, mongoose);
    store = new MongooseStore();

    mongoose.connect('mongodb://127.0.0.1:27017/test');
    mongoose.connection.on('open', function() {
      done();
    });
  });

  describe('Check that sessions can be set', function(){
    it('should be able to set values for a session', function(done){
      store.set('123'
        , { cookie: { maxAge: 2000 }, handle: '@complexcarb' }
        , function(err, ok){
          expect(err).to.not.exist;
          expect(ok).to.be.ok;
          done();
        })
    });

    it('should be able to get the value we just stored', function(done){
      store.get('123', function(err, ok){
        expect(err).to.not.exist;
        expect(ok).to.be.ok;
        expect(ok).to.have.property('cookie');
        expect(ok).to.have.deep.property('cookie.maxAge').and.to.eql(2000);
        expect(ok).to.have.property('handle').and.to.eql('@complexcarb');

        done();
      });
    });

    it('should remove the session we created', function(done){
      store.destroy('123', function(){
        store.get('123', function(err, ok){
          expect(err).to.not.exist;
          expect(ok).to.not.exist;
          done();
        });
      });
    });

    it('should add two sessions and clear them both', function(done){
      store.set('123', { cookie: {} }, function(err, ok){
        expect(err).to.not.exist;
        expect(ok).to.have.property('cookie')
        store.set('456', {cookie: {} }, function(err, ok){
          expect(err).to.not.exist;
          expect(ok).to.have.property('cookie')
          store.clearAll(function(){
            store.get('123', function(err, ok){
              expect(err).to.not.exist;
              expect(ok).to.not.exist;
              store.get('456', function(err, ok){
                expect(err).to.not.exist;
                expect(ok).to.not.exist;
                done();
              });
            });
          });
        });
      });
    });
  });
});
