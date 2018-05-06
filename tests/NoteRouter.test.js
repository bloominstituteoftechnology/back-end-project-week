const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const expect = chai.expect;
const server = require('../server');
const Note = require('../data/notes/NoteModel');
const User = require('../data/users/UserModel');

chai.use(chaiHTTP);

const newUser = new User({
    firstname: "Barnaby",
    lastName: "Jones",
    username: "bjones",
    password: "thisisaverysecurepassword"
});

describe('Notes', () => {
    before(done => {
        mongoose.connect('mongodb://localhost/test', {}, err => {
        if (err) return console.log(err);
        console.log('TEST DB Connection Achieved');
        });
        done();
    });
    after(done => {
        mongoose.connection.close();
        done();
    });
    beforeEach(() => {
        return newUser.save()
        .then(savedUser => console.log('yup'))
        .catch(err => console.log(err));
    });
    afterEach(() => {
        User
            .remove({})
            .then(console.log('all documents deleted'))
            .catch(err => console.log(error));
    });
    describe('[GET] to notes', () => {
        it('should return the notes for the user', () => {
            const agent = chai.request.agent(server)
            agent
                .post('/users/login')
                .then(res => {
                    return agent.get('/notes')
                    .then(res => {
                        expect(res).to.have.status(200);
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        });
    });
})
    