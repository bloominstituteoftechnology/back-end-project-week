const server = require('./api/server.js')
const request = require('supertest')
const db = require('./data/dbConfig.js')

beforeEach(async () => {
    await db('notes').truncate();
});

describe('notes database', () => {
    describe('get req to /', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })
    describe('get req to /notes', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/notes')
            expect(res.status).toBe(200)
        })
        it('should return an empty array without note data', async () => {
            let res = await request(server).get('/notes')
            expect(res.body).toEqual([])
        })
        it('should return an array of notes with data', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            let res = await request(server).get('/notes')
            expect(res.body).toEqual([{ title: 'Backend Project', content: 'Do the project', id: 1 }])
        })
    })
    describe('get req to /notes/:id', () => {
        it('should return status code 200', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            let res = await request(server).get('/notes/1')
            expect(res.status).toBe(200)
        })
        it('should return json', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            let res = await request(server).get('/notes/1')
            expect(res.type).toBe('application/json')
        })
        it('should return a note', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            let res = await request(server).get('/notes/1')
            expect(res.body).toEqual({ title: 'Backend Project', content: 'Do the project', id: 1 })
        })
    })
    describe('post req to /notes', () => {
        it('should return status code 201 for complete note data', async () => {
            let res = await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            expect(res.status).toBe(201)
        })
        it('should return status code 422 for incomplete note data', async () => {
            let res = await request(server)
                .post('/notes')
                .send({ title: 'Other Project' })
            expect(res.status).toBe(422)
        })
        it('should return json', async () => {
            let res = await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            expect(res.type).toBe('application/json')
        })
    })
    describe('delete req to /notes/:id', () => {
        it('should return status code 200', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            let res = await request(server).delete('/notes/1')
            expect(res.status).toBe(200)
        })
        it('should return an array of the remaining notes', async () => {
            await request(server)
                .post('/notes')
                .send({ title: 'Backend Project', content: 'Do the project' })
            await request(server)
                .post('/notes')
                .send({ title: 'Front Project', content: 'Did the project' })
            let res = await request(server).delete('/notes/1')
            expect(res.body).toEqual([{ title: 'Front Project', content: 'Did the project', id: 2 }])
        })
        it('should return error message if no notes were deleted', async () => {
            let res = await request(server).delete('/notes/1')
            expect(res.body).toEqual({ message: 'No notes deleted.' })
        })
    })
})