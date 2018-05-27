const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const server = require('./server');

chai.use(chaiHTTP);

const Note = require('./api/models/noteModel');
const User = require('./api/models/userModel');

describe('Users', () => {

  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/newtest');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  beforeEach(async () => {
    const user3 = new User({
      name: 'monkey7',
      password: 'bananas'
    });
    await user3.save();
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    User.remove({}, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  describe('[POST] /api/users', () => {
    const user = {
      name: 'monkey',
      password: 'bananas'
    };

    const user2 = {
      nombre: 'Charles',
      password: 'beans'
    };

    it('should return a success message when user is created', (done) => {
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User successfully created.');
        done();
      });
    });

    it('should return a message when no name provided', (done) => {
      chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Name & Password required.');
        done();
      });
    });

  });

  describe('[POST] /api/login', () => {
    const test = {
      name: 'monkey7',
      password: 'bananas'
    };

    it('should return a logged in message + token when logging in', (done) => {
      chai.request(server)
      .post('/api/login')
      .send(test)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Successfully logged in as monkey7.');
        expect(res.body.token).to.not.be.undefined;
        done();
      });
    });

    it('should return an error when given a name not in db', (done) => {
      chai.request(server)
      .post('/api/login')
      .send(Object.assign({}, { name: 'taco', password:'bell' }))
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Invalid Username and/or Password');
        expect(res.body.token).to.be.undefined;
        done();
      });
    });

    it('should return an error when password does not match', (done) => {
      test.password = 'apples';
      chai.request(server)
      .post('/api/login')
      .send(test)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Invalid Username and/or Password');
        expect(res.body.token).to.be.undefined;
        done();
      });
    });
  });
});

describe('Notes', () => {
  let token;

  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/newtest');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  beforeEach(async () => {
    const user3 = new User({
      name: 'monkey7',
      password: 'bananas'
    });
    await user3.save();
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    User.remove({}, (err) => {
      if (err) {
        console.error(err);
      }
    });
    Note.remove({}, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  describe('[POST] /api/notes', () => {
    it('should return a message and noteid when adding a note', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end((err, res) => {
        chai.request(server)
        .post('/api/notes')
        .set("Authorization", res.body.token)
        .send(testNote)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Note successfully saved.');
          expect(response.body.id).to.not.be.undefined;
          done();
        });
      });
    });
  });
 
  describe('[GET] /api/notes', () => {
    it('should return an array of notes', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end((err, res) => {
        testNote.author = res.body.id.toString();
        const newNote = new Note(testNote);
        newNote.save();
        chai.request(server)
        .get('/api/notes')
        .set("Authorization", res.body.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(1);
          expect(response.body.message).to.be.undefined;
          done();
        });
      });
    });

    it('should return empty array when given the wrong author', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end((err, res) => {
        testNote.author = '5ac2a5e33391d7302457ee6b';
        const newNote = new Note(testNote);
        newNote.save();
        chai.request(server)
        .get('/api/notes')
        .set("Authorization", res.body.token)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(0);
          done();
        });
      });
    });
  });
  
  describe('[PUT] /api/notes', () => {
    it('should return the new note', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end(async (err, res) => {
        testNote.author = res.body.id.toString();
        const newNote = new Note(testNote);
        await newNote.save();
        Note.find()
        .then(notes => {
          chai.request(server)
          .put('/api/notes')
          .set("Authorization", res.body.token)
          .send({ title: 'Changed title', content: 'Changed content', _id: notes[0]._id })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal('Changed title');
            expect(response.body.content).to.equal('Changed content');
            expect(response.body.message).to.be.undefined;
            done();
          });
        })
        .catch(error => {
          console.error(error)
          done();
        });
      });
    });

    it('should return an error message when given the wrong author', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end(async (err, res) => {
        testNote.author = '5ac2a5e33391d7302457ee6b';
        const newNote = new Note(testNote);
        await newNote.save();
        Note.find()
        .then(notes => {
          chai.request(server)
          .put('/api/notes')
          .set("Authorization", res.body.token)
          .send({ title: 'Changed title', content: 'Changed content', _id: notes[0]._id })
          .end((error, response) => {
            expect(response.status).to.equal(422);
            expect(response.body.title).to.be.undefined;
            expect(response.body.content).to.be.undefined;
            expect(response.body.message).to.equal('Wrong Author.');
            done();
          });
        })
        .catch(error => {
          console.error(error)
          done();
        });
      });
    });
    
    it('should return an error message when given the wrong note id', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end(async (err, res) => {
        testNote.author = '5ac2a5e33391d7302457ee6b';
        const newNote = new Note(testNote);
        await newNote.save();
        Note.find()
        .then(notes => {
          chai.request(server)
          .put('/api/notes')
          .set("Authorization", res.body.token)
          .send({ title: 'Changed title', content: 'Changed content', _id: '5ac2a5e33391d7302457ee6b' })
          .end((error, response) => {
            expect(response.status).to.equal(422);
            expect(response.body.title).to.be.undefined;
            expect(response.body.content).to.be.undefined;
            expect(response.body.message).to.equal('Note by that Id was not found.');
            done();
          });
        })
        .catch(error => {
          console.error(error)
          done();
        });
      });
    });

  });
  
  describe('[DELETE] /api/notes', () => {
    it('should return the deleted note', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end(async (err, res) => {
        testNote.author = res.body.id.toString();
        const newNote = new Note(testNote);
        await newNote.save();
        Note.find()
        .then(notes => {
          chai.request(server)
          .delete('/api/notes')
          .set("Authorization", res.body.token)
          .send({ _id: notes[0]._id })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal('testnote1');
            expect(response.body.content).to.equal('This is content. Are you content?');
            expect(response.body.message).to.be.undefined;
            done();
          });
        })
        .catch(error => {
          console.error(error)
          done();
        });
      });
    });
    
    it('should return an error message when given the wrong note id', (done) => {
      const testUser = {
        name: 'monkey7',
        password: 'bananas'
      };
      const testNote = {
        title: 'testnote1',
        content: 'This is content. Are you content?'
      };
      chai.request(server)
      .post('/api/login')
      .send(testUser)
      .end(async (err, res) => {
        testNote.author = '5ac2a5e33391d7302457ee6b';
        const newNote = new Note(testNote);
        await newNote.save();
        Note.find()
        .then(notes => {
          chai.request(server)
          .delete('/api/notes')
          .set("Authorization", res.body.token)
          .send({ _id: '5ac2a5e33391d7302457ee6b' })
          .end((error, response) => {
            expect(response.status).to.equal(422);
            expect(response.body.title).to.be.undefined;
            expect(response.body.content).to.be.undefined;
            expect(response.body.message).to.equal('Note by that Id was not found.');
            done();
          });
        })
        .catch(error => {
          console.error(error)
          done();
        });
      });
    });

  });

  
});