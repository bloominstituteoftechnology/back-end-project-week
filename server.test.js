const request = require('supertest');

const server = require('./server.js');

const db = require('./database/dbConfig.js')

describe('TSET FOR ROUTES IN ...server.js', () => {
    
    beforeEach(async () => {
        await db('notes').truncate();
    });

    //TEST FOR ROUTE TO GET ALL NOTES
    describe('route to get all notes', () => {
        it('should return status code 200 on success.. ', async () => {
            let response = await request(server).get('/api/notes');
            expect(response.status).toBe(200);
        })

        it('should return an empty array', async () => {
            let response = await request(server).get('/api/notes');
            expect(response.body).toEqual([]);
        });

        it('should return an array of length 1', async () => {
            await db('notes').insert({ title : 'NOTE-1', 
                                       content : "THIS IS NEW NOTE" });
            let response = await request(server).get('/api/notes');
            expect(response.body).toHaveLength(1);
        });
    })

    //TEST FOR ROUTE TO CREATE NEW NOTE
    describe('route to get all notes', () => {
        it('should return status code 200 on success.. ', async () => {
            let response = await request(server)
                                    .post('/api/notes')
                                    .send({  title : 'NOTE-1', content : 'NEW NOTE' });
            expect(response.status).toBe(201);
        })

        it('should return status 422 for incomplete body', async () => {
            let response = await request(server)
                                    .post('/api/notes')
                                    .send();
            expect(response.status).toBe(422);
        });
    })

    //TEST FOR ROUTE TO GET NOTES BY ID
    describe('GET /api/notes/:id', () => {
        it('should get the appropriate note', async () => {
                await db('notes').insert({ title: 'NOTE-1', content : 'NEW NOTE'});
                await db('notes').insert({ title: 'REACT', content : 'Javascript Library..'});
                
                let response = await request(server).get('/api/notes/1');
                expect(response.body).toEqual([{ id: 1, title: 'NOTE-1', content : 'NEW NOTE'}]);
                expect(response.status).toBe(200);
        });
         
        it('should return status 500 for not exiting note', async () => {
                let response = await request(server).get('/api/notes/50');
                expect(response.status).toBe(500);
        });
    })

    //TEST FOR  ROUTE TO DELETE A NOTE
    describe('DELETE /api/notes/:id', () => {
        it('should delete by id, with status 200 for success', async () => {
                await db('notes').insert({ title: 'NOTE-1', content : 'NEW NOTE'});
                await db('notes').insert({ title: 'REACT', content : 'Javascript Library..'});

                let response = await request(server).delete('/api/notes/2');
                expect(response.status).toBe(200);
                expect(response.body).toEqual({"message": "note successfully deleted."});
        });

        it('should return status 404 for nonexistent id', async () => {
                let response = await request(server).delete('/api/notes/1');
                expect(response.status).toBe(404);
        });
    })

    //TEST FOR  ROUTE TO UPDATE A NOTE
    describe('UPDATE /api/notes/:id', () => {
        it('should update note by id, with status 200 for success', async () => {
                await db('notes').insert({ title: 'NOTE-1', content : 'NEW NOTE'});
                
                let response = await request(server)
                                           .put('/api/notes/1')
                                           .send({title: 'REACT', content : 'Javascript Library..'});
                
                expect(response.status).toBe(200);
                expect(response.body).toEqual(1);
        });

        it('should return status 404 for nonexistent id', async () => {
                let response = await request(server).put('/api/notes/9');
                expect(response.status).toBe(404);
        });
    });

})