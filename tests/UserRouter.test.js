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
describe('Users', () => {
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
        newUser
            .save()
            .then(savedUser => {
                console.log(savedUser);
                userId = savedUser._id;
            });
    });
    afterEach(() => {
        return User
            .remove({})
            .then(console.log('all documents deleted'))
            .catch(err => console.log(error));
    });
    describe('[POST] to /users/register', () => {
        it('should allow user to be created with hashed password', () => {
            const dummyUser = {
                firstName: "first",
                lastName: "last",
                username: "name",
                password: "thisisthepassword"
            }
            return chai.request(server)
                .post('/users/register')
                .send(dummyUser).then(response => {
                    expect(response).to.have.status(200);
                    expect(response.body.password).to.not.equal(dummyUser.password);
                }).catch(err => console.log(err));
        });
    });
}); 