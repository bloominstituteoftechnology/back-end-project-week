const request = require("supertest");
const SERVER = require("./server");
const DB = require("../data/dbConfig");

describe("GET / starts server", () => {
  it("starts server", () => {
    request(SERVER)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe("Server Active");
      });
  });
});
