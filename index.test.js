const request = require('supertest');
const server = require('./api/server');
const db = require('./data/dbConfig');
const notes = require('./data/notesModel');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return {API: live}', async () => {
            let response = await request(server).get('/')
            expect(response.body).toEqual({API: 'live'});
        });

        it('should return json', async () => {
            let response = await request(server).get('/')
            expect(response.type).toBe('application/json');
        });
    })

    beforeEach(async () => {
        await db('notes').truncate();
    });

    describe('POST note', () => {
        it('should insert provided note', async () => {
            
            let rows = await db('notes').where({ title: 'Test' });
            expect(rows).toHaveLength(0);
        
            await notes.insert({ title: 'Test', textBody: 'test' });
            await notes.insert({ title: 'Trial', textBody: 'test' });
        
            rows = await db('notes').where({ title: 'Test' });
            expect(rows).toHaveLength(1);
        
            rows = await db('notes');
            expect(rows).toHaveLength(2);
        });

        it('should return correct status code', async () => {
            let response = await request(server).post('/note/create').send({title: 'Ronald', textBody: 'test'});
            expect(response.status).toBe(201);
        });

        it('should respond in JSON', async () => {
            let response = await request(server).post('/note/create').send({title: 'Ronald', textBody: 'test'});
            expect(response.type).toBe('application/json');
        });
    })

    describe('GET all', () => {
        it('should return status 200 on success', async () => {
            let response = await request(server).get('/note/get/all');
            expect(response.status).toBe(200); 
        });

        it('should return an empty array', async () => {
            let response = await request(server).get('/note/get/all');
            expect(response.body).toEqual([]);
        });

        it('should return an filled array', async () => {
            await notes.insert({ title: 'Pacman', textBody: 'Arcade'});
            await notes.insert({ title: 'Super Smash Bros Ultimate', textBody: 'Fighting'});

            let response = await request(server).get('/note/get/all');
            expect(response.body).toEqual([{ id: 1, tags: null, title: 'Pacman', textBody: 'Arcade'}, { id: 2, tags: null, title: 'Super Smash Bros Ultimate', textBody: 'Fighting' }]);
        });
    })

    describe('GET by id', () => {
        it('should get the appropriate note', async () => {
            await notes.insert({ title: 'Pacman', textBody: 'Arcade'});
            await notes.insert({ title: 'Super Smash Bros Ultimate', textBody: 'Fighting'});

            let response = await request(server).get('/note/get/1');
            expect(response.body).toEqual({ id: 1, tags: null, title: 'Pacman', textBody: 'Arcade'});
        });

        it('should get status code 200 on success', async () => {
            await notes.insert({ title: 'Pacman', textBody: 'Arcade'});
            await notes.insert({ title: 'Super Smash Bros Ultimate', textBody: 'Fighting'});

            let response = await request(server).get('/note/get/1');
            expect(response.status).toBe(200);
        });

        it('should return status 404 for nonexistent id', async () => {
            let response = await request(server).get('/note/get/1');
            expect(response.status).toBe(404);
        });
    })

    describe('DELETE note', () => {
        it('should delete specified note', async () => {
            let note = await request(server).post('/note/create').send({title: 'Test', textBody: 'test'});
            let response = await request(server).delete('/note/delete/1');
            expect(response.body).toBe(1);
        });

        it('should respond in JSON', async () => {
            let note = await request(server).post('/note/create').send({title: 'Test', textBody: 'test'});
            let response = await request(server).delete('/note/delete/1');
            expect(response.type).toBe('application/json');
        });

        it('should return correct status code', async () => {
            let note = await request(server).post('/note/create').send({title: 'Test', textBody: 'test'});
            let response = await request(server).delete('/note/delete/1');
            expect(response.status).toBe(200);
        });
    });  
});