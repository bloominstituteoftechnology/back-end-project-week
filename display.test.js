const mongoose = require('mongoose');
const chai = require('chai');
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const Notes = require('./api/models/notesModel');
const displayNote = require('./api/controllers/displayNote');
const server = require('./server');


chai.use(chaiHTTP);

// describe('Notes', () => {
//   before(done => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/test');
//     const db = mongoose.connection;
//     db.on('error', () => console.log('error'));
//     db.once('open', () => {
//       console.log('Connected to Database');
//       done();
//     });
//   });
// });

// after(done => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(done);
//     console.log('we are disconnected');
//   });
// });


describe('[GET] /api/displayNote', () => {
  it('should return all the notes', done => {
    chai
      .request(server)
      .get('/api/displayNote')
      .end((error, res) => {
        if (error) {
          console.log(error);
          return done();
        }
        expect(res.status).to.equal(200);
        // expect(Array.isArray(res.body)).to.equal(true);

        return done();
      });
  });
});