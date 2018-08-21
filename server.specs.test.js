const request = require("supertest");
const route = require("./Routes/NoteRoutes");

describe("router.js", () => {
  describe("GET routes", () => {
    it("should return a status code of 200 OK", async () => {
      const expected = 200;
      const response = await request(route.use("NoteRoutes"))
        .get("/")
        .end();
      expect(response.status).toEqual(expected);
    });
  });
});
