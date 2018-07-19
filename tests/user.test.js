const mongoose = require('mongoose');

const User = require('../models/User');

describe('The User Model', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://LisaCee:TU4aFT_PRN@ds141631.mlab.com:41631/lambdatest')
            .then(() => console.log('\n=== connected to TEST DB ==='))
            .catch(err => {
                console.log('error connecting to TEST database');
            });
    });

    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== disconnected from TEST DB ==='));
    });

    afterEach(() => {
        return User.remove()
    })

    it('runs the test suite', () => {
        
    })
    it('contains a username', async () => {
        const user = {
            email: 'lisa@lambdaschool.edu',
            username: 'LisaCee',
            password: 'password123'
        }
        const newUser = await User.create(user);
        expect(newUser.username).toBe('LisaCee');
    })
    it('contains a password 8+ characters long', async () => {
        const user = {
            email: 'lisa@lambdaschool.edu',
            username: 'LisaCee',
            password: 'password123'
        }

        expect(user.password.length).toBeGreaterThanOrEqual(8);
    })
    it('encodes the password before sending to server', async () => {
        const user = {
            email: 'lisa@lambdaschool.edu',
            username: 'LisaCee',
            password: 'password123'
        }

        const newUser = await User.create(user);
        expect(newUser.password).not.toBe(user.password);
    })
})

//regex for email format