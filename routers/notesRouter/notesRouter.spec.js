// const db = require("../../data/dbConfig");
// const routerDB = require("./notesRouter.js");
// const request = require('supertest')

// beforeEach( () => {
//     return db.migrate.rollback()
//     .then( () => {
//         return db.migrate.latest()
//         .then( () => {
//             return db.seed.run()
//         })
//     })
// });

// describe('Router Routes check', () => {
//     describe('Get endpoint /', () => {
//         it('responds with 200', async () => {
//             const response = await request(routerDB).get('/notes');
//             expect(response.body).toBe(200);
//         });

//         it('should respond with json', async () => {
//             const response = await routerDB.get('/api/notes')
//             expect(response.type).toMatch(/json/i);
//         });

//         it('responds with the correct amount of notes', async () => {
//             const response = await routerDB.get('/notes');
//             expect(response.length).toBe(3);
//         })

//     })
//     describe('Get endpoint /:id', async () => {
//         it('responds when grabbing one note', async () => {
//             const response = await routerDB.get('/2');
//             expect(response).toBe(1)
//         })

//         it('should respond with the proper title of an individual note', async () => {
//             const response = await routerDB.get('/2');
//             expect(response.id).toBe(2)
//         })

//         it('should respond with the proper content of an individual note', async () => {
//             const response = await routerDB.get('/2');
//             expect(response.content).toBe('content 2')
//         })

//     })
// })