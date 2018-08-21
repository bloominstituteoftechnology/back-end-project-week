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
      const expected = [
        { id: 1, textBody: "hi", title: "hello" },
        { id: 2, textBody: "goodbye", title: "bye" }
      ];
      const response = await request(server).get("/notes");
      expect(response.body).toEqual(expected);
    });
    test("should return json", async () => {
      const response = await request(server).get("/notes");
      expect(response.type).toEqual("application/json");
    });
  });
  describe("(/notes/:id endpoint", () => {
    test("should return status 200 ok", async () => {
      const expected = 200;
      const response = await request(server).get(`/notes/${1}`);
      expect(response.status).toEqual(expected);
    });
    test("should return note with specified id", async () => {
      const expected = [{ id: 1, textBody: "hi", title: "hello" }];
      const response = await request(server).get(`/notes/${1}`);
      expect(response.body).toEqual(expected);
    });
    test("should return json", async () => {
      const response = await request(server).get(`/notes/${1}`);
      expect(response.type).toEqual("application/json");
    });
    test("should return status 404 when id does not exist", async () => {
      const expected = 404;
      const response = await request(server).get(`/notes/${5}`);
      expect(response.status).toEqual(expected);
    });
    test("should return error message when id does not exist", async () => {
      const expected = {
        message: "The note with the specified ID does not exist"
      };
      const response = await request(server).get(`/notes/${5}`);
      expect(response.body).toEqual(expected);
    });
  });
});
