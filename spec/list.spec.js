const request = require("supertest");
const server = require("../index");

describe("List Route", () => {
  describe("POST /api/lists/create", () => {
    it("should check for response status", async () => {
      const res = await request(server)
        .post("/api/lists/create")
        .send({
          userId: 1,
          name: `dang! what should I call this ${Math.random()}`,
          description: `just random again`
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
    });
  });

  describe("POST /api/lists/addNote", () => {
    it("should check for response status", async () => {
      const res = await request(server)
        .post("/api/lists/addNote")
        .send({
          noteId: 1,
          listId: 1
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
    });
  });
});
