const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../server');
const Notes = require('../Notes/notesModel');
const Users = require('../Users/usersModel');

describe('server', () => {
    beforeAll(() => {
        return mongoose
            .connect('mongodb://admin:admin@ds141320.mlab.com:41320/lambda-notes')
            .then(() => console.log('\n=== Connected to TEST DB ==='));
    });

    afterAll(() => {
        return mongoose
            .disconnect()
            .then(() => console.log('\n=== Disconnected from TEST DB ==='));
    });

    afterEach(() => {
        // clears collection
        return Notes.remove();
    });

    it('runs the tests', () => {});

    it('Should show Server Working with 200 json code for OK', async () => {
        const expected = { Message: 'Server Works' };
        // const response = await 
        request(server)
            .get('/')
            .then(response => {

        expect(response.status).toBe(200); //200 = ok
        expect(response.type).toBe('application/json')
        expect(response.body).toEqual(expected)
        })
    })
});

// Test the GET Users here
it('Should GET List of Users', async () => {
    request(server)
        .get('/users')
        .then(response => {

    expect(response.status).toBe(200); // Returns 200 Status Ok!
    expect(response.type).toBe('application/json');
    expect(response.body[0].title).toEqual('pug');
  })
});

// Test the POST Users here
it('Should POST New User', async () => {
    const users = new Users({ username: 'pug', password: 'pug' });
        request(server)
        .post('/users')
        .send(users)
        .then(response => {

    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body.username).toEqual('pug');
    expect(response.body).toMatchObject({ username: 'pug', password: 'pug' })
  })
});

// Test the GET Notes here
it('Should GET List of Notes', async () => {
    request(server)
        .get('/notes')
        .then(response => {

    expect(response.status).toBe(200); // Returns 200 Status Ok!
    expect(response.type).toBe('application/json');
    expect(response.body[0].title).toEqual('Test 5');
  })
});

// Test the POST Notes here
it('Should POST New Note', async () => {
    const notes = new Notes({ title: 'Test 5', content: 'Test 5' });
        request(server)
        .post('/notes')
        .send(notes)
        .then(response => {

    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body.title).toEqual('Test 5');
    expect(response.body).toMatchObject({ title: 'Test 5', content: 'Test 5' })
  })
});