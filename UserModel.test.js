const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const User = require('./models/UserModel');

describe('User Model', () => {
    before(done => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/test');
        const db = mongoose.connection;
        db.on('error', () => console.error.bind(console, 'There was an error connecting to the database'));
        db.once('open', () => {
            console.log('Connected to the database');
            done();
        });
    });
    after(done => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done);
            console.log('Connection to the database was disconnected');
        });
    });

    describe('#getUserName()', () => {
        it('should return the correct User title', () => {
            const user = new User ({
                username: 'habib1234731',
                password: 'psaword',
                firstName: "Habib",
                lastName: 'Rehman',
                age: 20
            });
            expect(user.getUserName()).to.equal('habib1234731');
        });
    });

    describe('#getAllData()', () => {
        it('should return all of the users', () => {
            sinon.stub(User, 'find');
            User.find.yields(null, [
                {
                    username: 'habib1234731',
                    password: 'psaword',
                    firstName: "Habib",
                    lastName: 'Rehman',
                    age: 20
                }
            ]);
            User.getAllData(returnObject => {
                expect(returnObject.length).to.equal(1);
                expect(returnObject[0].title).to.equal('habib1234731');
                User.find.restore();
            });
        });
    });
});