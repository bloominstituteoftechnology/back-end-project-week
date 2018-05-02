// const mongoose = require('mongoose');
// const chai = require('chai');
// const chaiHTTP = require('chai-http');
// const { expect } = chai;
// const sinon = require('sinon');

// const server = require('./server.js');
// const Note = require('./notes/Note.js');
// const User = require('./users/User.js');

// chai.use(chaiHTTP);

// describe('Notes', () => {
//   let gameId;

//   before(done => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/test');
//     const db = mongoose.connection;
//     db.on('error', () => console.error.bind(console, 'connection error'));
//     db.once('open', () => {
//       console.log('Test DB connected');
//       done();
//     });
//   });

//   after(done => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(done);
//       console.log('Test DB disconnected');
//     });
//     userId = null;
//   });

//   beforeEach(done => {
//     const testGame = new Game({
//       title: 'Super Mario World',
//       genre: 'Platforming',
//       releaseDate: 'November 1990',
//     });
//     testGame.save((err, saved) => {
//       userId = saved._id.toString();
//       done();
//     })
//   });

//   afterEach(done => {
//     Game.remove((err, removed) => {
//       userId = null;
//       done();
//     });
//   });

//   describe('[POST] to /api/game/create', () => {
//     it('should do add a new game to the database', done => {
//       chai
//         .request(server)
//         .post('/api/game/create')
//         .send({
//           'title': 'California Games',
//           'genre': 'Sports',
//           'releaseDate': 'June 1987',
//         })
//         .end(function(err, res) {
//           if (err) expect(err).to.have.status(422);
//           expect(res.body).to.have.property('_id');
//           expect(res.body.title).to.equal('California Games');
//           expect(res.body.genre).to.equal('Sports');
//           expect(res.body.releaseDate).to.equal('June 1987');
//           done();
//         });
//     });
//     it('if title and genre are not provided throws error', done => {
//       chai
//         .request(server)
//         .post('/api/game/create')
//         .send({
//           'genre': 'Sports',
//           'releaseDate': 'June 1987',
//         })
//         .end(function(err, res) {
//           expect(res).to.have.status(422);
//           done();
//         });
//     });
//   });

//   describe('[GET] to /api/game/get', () => {
//     it('should return games in the database', done => {
//       chai
//         .request(server)
//         .get('/api/game/get')
//         .end(function(err, res) {
//           if (err) expect(err).to.have.status(500);
//           expect(res.body.length).to.equal(1);
//           done();
//         });
//     });
//   });

//   describe('[DELETE] to /api/game/destroy/:id', () => {
//     it('should delete an id', done => {
//       chai
//       .request(server)
//       .delete(`/api/game/destroy/${gameId}`)
//       .send({id: gameId})
//       .end(function(err, res) {
//           if (err) expect(err).to.have.status(422);
//           expect(res.body).to.have.property('success')
//           done();
//         });
//     });
//     it('if not found throws an error', done => {
//       chai
//         .request(server)
//         .delete(`/api/game/destroy/3`)
//         .end(function(err, res) {
//           if (err) expect(err).to.have.status(422);
//           done();
//         });
//     });
//   });

//   describe('[PUT] to /api/game/update', () => {
//     it('should update a game', done => {
//       chai
//         .request(server)
//         .put('/api/game/update')
//         .send({
//           'title': 'California Gamez',
//           'id': `${gameId}`,
//         })
//         .end(function(err, res) {
//           if (err) expect(err).to.have.status(422);
//           expect(res.body.title).to.equal('California Gamez');
//           done();
//         });
//     });
//   });
// });

// describe('User Model', () => {
//   before(done => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/test');
//     const db = mongoose.connection;
//     db.on('error', () => console.error.bind(console, 'connection error'));
//     db.once('open', () => {
//       console.log('we are connected');
//       done();
//     });
//   });

//   after(done => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(done);
//       console.log('we are disconnected');
//     });
//   });

//   describe('#getGameTitle', () => {
//     it('should give back the proper game.title', () => {
//       const game = new Game({
//         title: 'California Games',
//         date: 'June 1987',
//         genre: 'Sports'
//       });
//       expect(game.getGameTitle()).to.equal('California Games');
//     });
//   });

//   describe('#getAllGames()', () => {
//     it('should return all the games', () => {
//       sinon.stub(Game, 'find');
//       Game.find.yields(null, [
//         {
//           title: 'California Games',
//           date: 'June 1987',
//           genre: 'Sports'
//         }
//       ]);
//       Game.getGames(returnObject => {
//         expect(returnObject.length).to.equal(1);
//         expect(returnObject[0].title).to.equal('California Games');
//         Game.find.restore();
//       });
//     });
//   });
// });

