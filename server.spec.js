const codes = require('./data/statusCodes');
 const request = require('supertest');
 const { paths, server } = require('./server');

 function isObject(obj) {
    if(typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
        return true;
    }
    return false;
}

 describe('server.js', () => {
    describe('GET request for notes (/api/notes)', () => {
        it('should return a status code of 200 OK', async () => {
            const response = await request(server).get(paths.notes);
            expect(response.status).toBe(codes.OK);
        })
        it('should return an array', async () => {
            const response = await request(server).get(paths.notes);
            expect(Array.isArray(response.body)).toBeTruthy();
        })
        it('should return an array of objects', async () => {
            const response = await request(server).get(paths.notes);
            response.body.forEach(noteObj => {
                expect(isObject(noteObj)).toBeTruthy();
            });
        })
    })
 });