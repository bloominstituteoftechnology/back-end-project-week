const request = require('supertest');

const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('notes').truncate();
})

/*
* Testing block for the GET endpoint of /api/notes.
* It should respond with server status code 200.
* It should send back a JSON object.
* It should send back an empty object.
*/
describe('Checking the GET endpoint for /api/notes', () => {
    it('Responds with server status code 200.', async () => {
        const response = await request(server).get('/api/notes');
        // Response status should be 200
        expect(response.status).toBe(200);
    });
    it('Sends back JSON as the type.', async () => {
        const response = await request(server).get('/api/notes');
        // This endpoint responds with a JSON object.
        expect(response.type).toMatch(/json/i);
    });
    it('Sends back an empty object during testing.', async () => {
        const response = await request(server).get('/api/notes');
        // This endpoint responds with an empty object during testing.
        expect(response.body).toEqual([]);
    });
});

/*
* Testing block for the POST endpoint of /api/notes
* It should respond with server code 201 (created) when it successfully posts.
* It should respond with a JSON object.
* It should send us back the ID of the created object.
* It should respond with server code 422 (unprocessable entity) when it receives a malformed object from body.
*/
describe('Checking the POST endpoint for /api/notes', () => {
    it('Sends back server status code 201', async () => {
        const body = {
            title: 'Testing note #1',
            content: 'This is a note created during testing. It will auto truncate after each test.'
        }
        const response = await request(server).post('/api/notes').send(body);
        // This responds with server status code 201
        expect(response.status).toBe(201);
    });
    it('Sends back a JSON object', async () => {
        const body = {
            title: 'Testing note #1',
            content: 'This is a note created during testing. It will auto truncate after each test.'
        }
        const response = await request(server).post('/api/notes').send(body);
        // This responds with a JSON object.
        expect(response.type).toMatch(/json/i);
    });
    it('Sends back the ID of the created note.', async () => {
        const body = {
            title: 'Testing note #1',
            content: 'This is a note created during testing. It will auto truncate after each test.'
        }
        const response = await request(server).post('/api/notes').send(body);
        // This gives us the ID of the created note {id: 1}
        expect(response.body).toEqual({id: 1});
    });
    it('Responds with server status code 422 when sending a malformed note object.', async () => {
        const body = {
            content: 'This is a note created during testing. It will auto truncate after each test.'
        }
        const response = await request(server).post('/api/notes').send(body);
        // This will respond with server status code 422 anytime we send a malformed note object.
        expect(response.status).toBe(422);
    });
});

/*
* Testing block for the delete endpoint for /api/notes
* It should send status 200 when completed.
* It should respond with a JSON object
***I want to test this in code. I think it sends back a number of items deleted. Not the ID but I want to code it to send back the ID.
* It should respond with the ID of the object deleted. 
* It should send status 404 when an ID cannot be found
*/
describe('Checking the delete endpoint for /api/notes', () => {
    it('Responds with server status 200.', async () => {
        // Feed the delete some data.
        const body = {
            title: 'Testing note #1',
            content: 'This is a note created during testing. It will auto truncate after each test.'
        }
        await request(server).post(body);

        const response = await request(server).delete('/api/notes/1');
        // Expect this to be status code 200
        expect(response.status).toBe(200);
    });
});