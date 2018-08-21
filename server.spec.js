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
  //   describe("(/notes) get endpoint", () => {
  //     test("should return status 200 ok", async () => {
  //       const expected = 200;
  //       const response = await request(server).get("/notes");
  //       expect(response.status).toEqual(expected);
  //     });
  //     test("should return db", async () => {
  //       const expected = [
  //         { id: 1, textBody: "hi", title: "hello" },
  //         { id: 2, textBody: "goodbye", title: "bye" }
  //       ];
  //       const response = await request(server).get("/notes");
  //       expect(response.body).toEqual(expected);
  //     });
  //     test("should return json", async () => {
  //       const response = await request(server).get("/notes");
  //       expect(response.type).toEqual("application/json");
  //     });
  //   });
  //   describe("(/notes/:id get endpoint", () => {
  //     test("should return status 200 ok", async () => {
  //       const expected = 200;
  //       const response = await request(server).get(`/notes/${1}`);
  //       expect(response.status).toEqual(expected);
  //     });
  //     test("should return note with specified id", async () => {
  //       const expected = [{ id: 1, textBody: "hi", title: "hello" }];
  //       const response = await request(server).get(`/notes/${1}`);
  //       expect(response.body).toEqual(expected);
  //     });
  //     test("should return json", async () => {
  //       const response = await request(server).get(`/notes/${1}`);
  //       expect(response.type).toEqual("application/json");
  //     });
  //     test("should return status 404 when id does not exist", async () => {
  //       const expected = 404;
  //       const response = await request(server).get(`/notes/${5}`);
  //       expect(response.status).toEqual(expected);
  //     });
  //     test("should return error message when id does not exist", async () => {
  //       const expected = {
  //         message: "The note with the specified ID does not exist"
  //       };
  //       const response = await request(server).get(`/notes/${5}`);
  //       expect(response.body).toEqual(expected);
  //     });
  //   });
  //   describe("(/notes) post endpoint", () => {
  //     test("should return status 201 note created", async () => {
  //       const expected = 201;
  //       const response = await request(server)
  //         .post("/notes")
  //         .send({
  //           title: "wowie",
  //           textBody: "summin"
  //         });
  //       expect(response.status).toEqual(expected);
  //     });
  //     test("should return note created", async () => {
  //       const expected = {
  //         title: "somethingss",
  //         textBody: "wowzersss"
  //       };
  //       const response = await request(server)
  //         .post("/notes")
  //         .send({
  //           title: "somethingss",
  //           textBody: "wowzersss"
  //         });
  //       expect(response.body).toEqual(expected);
  //     });
  //     test("should return code 400 no text or textBody", async () => {
  //       const expected = 400;
  //       const response = await request(server)
  //         .post("/notes")
  //         .send({
  //           title: "",
  //           textBody: ""
  //         });
  //       expect(response.status).toEqual(expected);
  //     });
  //     test("should return error message if no text or body", async () => {
  //       const expected = { error: "Please provide title and textBody" };
  //       const response = await request(server)
  //         .post("/notes")
  //         .send({
  //           title: "",
  //           textBody: ""
  //         });
  //       expect(response.body).toEqual(expected);
  //     });
  //     test("should return json", async () => {
  //       const response = await request(server)
  //         .post("/notes")
  //         .send({
  //           title: "somethingsssss",
  //           textBody: "wowzerssssss"
  //         });
  //       expect(response.type).toEqual("application/json");
  //     });
  //   });
  describe("(/notes/:id) delete endpoint", () => {
    // test("should return status 200 ok when deleted note", async () => {
    //   const expected = 200;
    //   const response = await request(server)
    //     .delete(`/notes/${33}`)
    //     .send({ id: "33" });
    //   expect(response.status).toEqual(expected);
    // });
    // test("should return message note deleted when deleted", async () => {
    //   const expected = { message: "note deleted" };
    //   const response = await request(server)
    //     .delete(`/notes/${32}`)
    //     .send({ id: "32" });
    //   expect(response.status).toEqual(expected);
    // });
    test("should return 404 status if note id does not exist", async () => {
      const expected = 404;
      const response = await request(server)
        .delete(`/notes/${44}`)
        .send({ id: "44" });
      expect(response.status).toEqual(expected);
    });
    test("should return message note not exist if id does not exist", async () => {
      const expected = {
        message: "The note with the specified ID does not exist"
      };
      const response = await request(server)
        .delete(`/notes/${44}`)
        .send({ id: "44" });
      expect(response.body).toEqual(expected);
    });
  });
});
