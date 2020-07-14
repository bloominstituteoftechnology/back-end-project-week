const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
    it("run the tests", () => {
      expect(true).toBeTruthy();
    })



describe("GET /notes", () =>{
    it("returns 200 status", async () =>{
        const response = await request(server).get("/notes");
        expect(response.status).toEqual(200);
    })
})

})