const request = require("supertest");
const server = require("../index");

describe("User Route", () => {
  describe("GET /api/users", () => {
    let res;
    beforeAll
    (async () =>{

     res = await request(server).get("/api/users/");
  });
       
      //console.log(res)
     it("OK(200)",() =>{
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(typeof res.body.users).toBe("object");
    });
  });
});
