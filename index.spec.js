const request = require("supertest");
const server = require("./index");

describe("index.js", () => {
  describe("/ route", () => {
    it("should return status code 200", async () => {
      let response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    
    it("should return text/html", async () => {
        let response = await request(server).get("/");
        expect(response.type).toBe("text/html");
      });
  });
  describe('get notes', () =>{
    it("should return status code 200", async () => {
        let response = await request(server).get("/api/notes");
        expect(response.status).toBe(200);
      });
      
      it("should return JSON", async () => {
          let response = await request(server).get("/api/notes");
          expect(response.type).toBe("application/json");
        });
  })
});
