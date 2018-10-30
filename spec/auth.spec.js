const request = require("supertest");
const server = require("../index");

describe("Auth Route", () => {
    describe("POST /api/auth/register", () => {
        it("should check for response status", async () => {
            const res = await request(server)
                .post("/api/auth/register")
                .send({
                    username: `csillag${Math.random()}`,
                    password: 'matek'
                });
            
            expect(res.status).toBe(200)
            expect(res.body.status).toBe(true)
        });
    });
});



