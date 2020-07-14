const request = require("supertest");
const server = require("../index");

describe("List Route", () => {
  describe("POST /api/lists/create", () => {
    let res;
    beforeAll(async () => {
      res = await request(server)
        .post("/api/lists/create")
        .send({
          userId: 1,
          name: ` this is ${Math.random()}`,
          description: `random`
        });

      it("should check for response status", () => {
        expect(res.status).toBe(200);
      });
    });
  });

  describe("POST /api/lists/addNote", (req, res) => {
   
    beforeAll(async () => {
      res = await request(server)
        .post("/api/lists/addNote")
        .send({ noteId: 1, listId: 1 });

      it("should check for response status", () => {
        expect(res.status).toBe(200);
      });
    });
  });
});
