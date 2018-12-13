const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbConfig.js');

describe("notesRouter.js", () => {
    describe("Test the root path", () => {
      it("should return status code 200", async () => {
        let response = await request(server).get("/");
        expect(response.status).toBe(200);
      });

      it('should return with a body like: { api: "alive" }', async () => {
        let response = await request(server).get('/');
        
        expect(response.body).toEqual({ api: 'alive' });
        });
    });

    describe("POST /notes", async () => {
        it("should return status code 201", async () => {
          const body = { title: 'test testing', content: 'testing' };
          let response = await request(server).post("/api/notes").send(body);
  
          expect(response.status).toBe(201);
        });

        it("should return JSON", async () =>{
            let response = await request(server).post('/api/notes');

            expect(response.type).toBe('application/json');
        });
      });
  }); 

  afterAll(async () => {
    await db('notes').truncate();
  });