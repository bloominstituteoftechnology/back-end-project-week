const db = require("../../data/dbConfig");
const router = require("./notesRouter.js");

beforeEach( () => {
    return db.migrate.rollback()
    .then( () => {
        return db.migrate.latest()
        .then( () => {
            return db.seed.run()
        })
    })
});

describe('Router Routes check', () => {
    it('responds with 200', async () => {
        const response = await router.get('/');
        expect(response.length).toBe(3);
    })
})