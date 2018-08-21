const request = require("supertest");
const { server, db } = require("./server.js");

describe("server.js", () => {
  describe("(/) root endpoint", () => {
    test("should return text Hello", async () => {
      const expected = "Hello";
      const response = await request(server).get("/");
      expect(response.text).toEqual(expected);
    });
  });
  describe("(/notes) db", () => {
    test("should return status 200 ok", async () => {
      const expected = 200;
      const response = await request(server).get("/notes");
      expect(response.status).toEqual(expected);
    });
    test("should return db", async () => {
      const expected = [{ id: 1, textBody: "hi", title: "hello" }];
      const response = await request(server).get("/notes");
      expect(response.body).toEqual(expected);
    });
    test("should return json", async () => {
      const response = await request(server).get("/notes");
      expect(response.type).toEqual("application/json");
    });
  });
});
