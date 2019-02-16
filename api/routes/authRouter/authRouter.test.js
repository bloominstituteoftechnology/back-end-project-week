const request = require("supertest");
const server = require("../../server");
const DB = require("../../../data/dbConfig");

describe("AUTH ROUTE HANDLERS", () => {
  afterEach(async () => {
    await DB("users").truncate();
    await DB.seed.run();
  });

  describe("POST /api/auth/register", () => {
    it("returns a status code 201 when registering", async () => {
      const user = {
        name: "Joseph Thompson",
        email: "brandon@josephmt.com",
        password: "password",
        role: "user"
      };
      const body = { user };
      const response = await request(server)
        .post("/api/auth/register")
        .send(body);

      expect(response.status).toBe(201);
    });
  });
});
