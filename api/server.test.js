const request = require("supertest");
const app = require("./server");

describe("server", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: "welcome to Angelina La Salle's back end project week API"
    });
  });
});
