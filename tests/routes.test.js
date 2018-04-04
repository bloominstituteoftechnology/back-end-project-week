// const mongoose = require('mongoose');
// const chai = require('chai');
// const { expect } = chai;
// const sinon = require('sinon');
// const server = require('../server');

// const chaiHTTP = require('chai-http');

// const Note = require('../api/models/noteModel');
// chai.use(chaiHTTP);

// describe('Notes', () => {
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
//   let noteId = null;
//   let testNote = null;
//   beforeEach(done => {
//     const myNote = new Note({
//       title: 'Office Ipsum',
//       text:
//         'Red flag powerPointless sacred cow, so usabiltiy, so dog and pony show, nor get all your ducks in a row, nor prairie dogging. Quick win. Three-martini lunch shotgun approach high-level. Draw a line in the sand enough to wash your face not a hill to die on strategic fit work flows best practices. Thought shower granularity, and bleeding edge, yet we need to start advertising on social media, take five, punch the tree, and come back in here with a clear head, but strategic high-level 30,000 ft view we need to button up our approach. Put a record on and see who dances put a record on and see who dances, so guerrilla marketing, for deliverables and hammer out. Driving the initiative forward personal development upsell. Ultimate measure of success can you send me an invite?. Fire up your browser to be inspired is to become creative, innovative and energized we want this philosophy to trickle down to all our stakeholders. It just needs more cowbell. Touch base. Commitment to the cause innovation is hot right now, blue sky thinking criticality high-level move the needle, and drink from the firehose. Low-hanging fruit imagineer, nor we are running out of runway, mobile friendly prethink, and we need to button up our approach. We are running out of runway. Design thinking productize out of scope, yet this vendor is incompetent and product management breakout fastworks thought shower.',
//     });
//     myNote
//       .save()
//       .then(note => {
//         testNote = note;
//         noteId = note._id;
//         done();
//       })
//       .catch(err => {
//         console.error(err);
//         done();
//       });
//   });
//   afterEach(done => {
//     Note.remove({}, err => {
//       if (err) console.error(err);
//       done();
//     });
//   });

//   // POST
//   describe('[POST] /api/notes/create', () => {
//     it('should add a new note', done => {
//       const myNote = {
//         title: 'Pirate Ipsum',
//         text:
//           'Mutiny grapple careen sloop keelhaul Plate Fleet aye yardarm Admiral of the Black keel. Knave swab yardarm strike colors aft furl tender Sea Legs Shiver me timbers walk the plank. Nipper hulk galleon mutiny topsail salmagundi knave coffer long clothes coxswain. Squiffy American Main careen haul wind to go on account lookout mizzen cog lateen sail Plate Fleet. Provost walk the plank smartly splice the main brace yard haul wind bilge rat bring a spring upon her cable Jack Ketch doubloon. <br> Nelsons folly spirits Barbary Coast me heave down scurvy warp shrouds wench Chain Shot. Pirate Round ye grapple Chain Shot keel haul wind nipperkin transom aye belay. Tack salmagundi no prey, no pay carouser fire in the hole holystone bilged on her anchor lateen sail loot Corsair. Strike colors cackle fruit flogging line spike Letter of Marque ye code of conduct bilged on her anchor fire in the hole.',
//       };
//       chai
//         .request(server)
//         .post('/api/notes/create')
//         .send(myNote)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//             done();
//           }
//           expect(res.status).to.equal(200);
//           //myNote.title
//           expect(res.body.title).to.equal(myNote.title);
//         });
//       done();
//     });
//   });

//   // GET
//   describe('[GET] /api/notes/get', () => {
//     it('should get all notes', done => {
//       chai
//         .request(server)
//         .get('/api/notes/get')
//         .end((err, res) => {
//           if (err) {
//             console.error(err);
//             done();
//           }
//           //testNote.title
//           //noteId.toString()
//           expect(res.body[0].title).to.eql(testNote.title);
//           expect(res.body[0]._id).to.equal(noteId.toString());
//         });
//       done();
//     });
//   });

//   // describe('[GET] /api/notes/get/:id', () => {
//   //   it('should get one note by given id', done => {
//   //     chai
//   //       .request(server)
//   //       .get(`/api/notes/get/${id}`)
//   //       .end((err, res) => {
//   //         if (err) {
//   //           console.error(err);
//   //           done();
//   //         }
//   //         Note.findById(noteId, (err, note) => {
//   //           if (err) {
//   //             console.log(err);
//   //             done();
//   //           }
//   //           expect(note).to.equal('Office');
//   //         }
//   //         done();
//   //   });
//   // });

//   // PUT
//   describe('[PUT] /api/notes/update', () => {
//     it('should update a note with the given id', done => {
//       const noteUpdate = {
//         id: noteId,
//         title: 'Weird Ipsum',
//       };
//       chai
//         .request(server)
//         .put('/api/notes/update')
//         .send(noteUpdate)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//             done();
//           }
//           //noteUpdate.title
//           expect(res.body.title).to.equal('meh');
//         });
//       done();
//     });
//   });

//   // DELETE
//   describe('[DELETE] /api/notes/destroy/:id', () => {
//     it('should remove the specified note from the database', done => {
//       chai
//         .request(server)
//         .delete(`/api/notes/destroy/${noteId}`)
//         .end((err, res) => {
//           if (err) {
//             console.log(err);
//             done();
//           }
//           expect(res.text).to.equal(
//             '{"success":"Office Ipsum was removed from the DB"}',
//           );
//           Note.findById(noteId, (err, deletedNote) => {
//             if (err) {
//               console.log(err);
//               done();
//             }
//             expect(deletedNote).to.equal(null);
//           });
//           done();
//         });
//     });
//   });
// });
