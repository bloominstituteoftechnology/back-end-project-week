const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");

describe("the route handlers", () => {
   describe("get /all", () => {
      it("responds with 200", async () => {
         const response = await request(server).get("/all");

         expect(response.status).toBe(200);
      });
      it("response with json", async () => {
         const response = await request(server).get("/all");

         expect(response.type).toMatch(/json/i);
      });
      it("sends correct response", async () => {
         const response = await request(server).get("/all");

         expect(response.body).toEqual({api: "running"});
      });
   });
});