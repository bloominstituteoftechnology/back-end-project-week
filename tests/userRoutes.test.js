const request = require('supertest');
const server = require('../server');
const User = require('../models/User')
const userRoutes = require('../routes/userRoutes');
const mongoose = require('mongoose');

describe('userRoutes', () => {
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
        return User.remove();
    })

    it('has a GET / endpoint', async () => {
        await request(server)
            .get('/user')
            .expect(200)
    })

    it('has a GET / endpoint that returns 200', async () => {
        await request(server)
            .get('/')
            .expect(200)
    })

    it('has a GET / endpoint that returns json', async () => {
        const expectedJSON = { msg: "Connected" }
        const response = await request(server).get('/')
        expect(response.body).toEqual(expectedJSON)
    })

    it('has a POST / endpoint that returns 201', async () => {
        const user = {
            email: 'lisa@lambdaschool.edu',
            username: 'LisaCee',
            password: 'password123'
        }
        const newUser = await User.create(user);
        await request(server).post('/user/signup', newUser)
            expect(201);
    })
    it('should return user data after being saved to db', async () => {
        const newUser = {
            email: 'lisa@lambdaschool.edu',
            username: 'LisaCee',
            password: 'password123'
        }
        const response = await request(server)
            .post('/user/signup')
            .send(newUser)
        expect(newUser)
        expect(response.body.username).toEqual('LisaCee');
    })

})