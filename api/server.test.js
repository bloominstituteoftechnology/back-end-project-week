const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("the route handlers", () => {
   describe("get /", () => {
      it("responds with 200", async () => {
         const response = await request(server).get("/");

         expect(response.status).toBe(200);
      });
      it("response with json", async () => {
         const response = await request(server).get("/");

         expect(response.type).toMatch(/json/i);
      });
      it("sends correct response", async () => {
         const response = await request(server).get("/");

         expect(response.body).toEqual({api: "running"});
      });
   });
   describe("get /notes/all", () => {
      it("responds with 200", async () => {
         const response = await request(server).get("/note/all");

         expect(response.status).toBe(200);
      });
      it("responds with json", async () => {
         const response = await request(server).get("/note/all");

         expect(response.type).toMatch(/json/i);
      });
      it("sends correct response", async () => {
         const response = await request(server).get("/note/all");
         expect(response.body).toEqual([{
               "author": "Lambda School",
               "contents": "This is lambda!",
               "id": 1,
               "title": "Welcome",
            },
            {
               "author": "Lambda School",
               "contents": "We teach students to code",
               "id": 2,
               "title": "what We Do",
            },
            {
               "author": "Lambda School",
               "contents": "Nerds! Well, most of us anyway",
               "id": 3,
               "title": "Who We Are",
            }]);
      });
   });
   describe("get /note/:id", () => {
      it("responds with 200 when id exists", async () => {
         const id = 1;
         const response = await request(server).get(`/note/${id}`);
         expect(response.status).toBe(200);
      });
      it("responds with json", async () => {
         const id = 1;
         const response = await request(server).get(`/note/${id}`);

         expect(response.type).toMatch(/json/i);
      });
      it("sends the correct response", async () => {
         const id = 1;
         const response = await request(server).get(`/note/${id}`);

         expect(response.body).toEqual([{
            "author": "Lambda School",
            "contents": "This is lambda!",
            "id": 1,
            "title": "Welcome",
         }]);
      })
   });
   describe.skip("post /note/create", () => {
      it("response with 201 when body is correct", async () => {
         const body = {
            title: "Welcome",
            contents: "welcome to lambda school"
         };
         const response = await request(server).post("/note/create").send(body);

         expect(response.status).toBe(201);
         async () => {
            await db("notes").truncate();
         }
      });
      it("responds with 422 when body is missing", async () => {
         const body = {};
         const response = await request(server).post("/note/create").send(body);

         expect(response.type).toMatch(/json/i);
         expect(response.status).toBe(422);
         async () => {
            await db("notes").truncate();
         }
      });
      it("response with array containing new id", async () => {
         const body = {
            title: "Welcome",
            contents: "welcome to lambda school"
         };
         const response = await request(server).post("/note/create").send(body);

         expect(response.body.length).toBe(1);
         async () => {
            await db("notes").truncate();
         }
      })
   });
});