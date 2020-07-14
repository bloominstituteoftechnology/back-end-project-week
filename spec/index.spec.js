const request = require("supertest");
const server = require("../index");

describe("GET /", () => {
    let res;
     beforeAll (async () => {
         res = await request(server).get("/");
        
    });
    it("should check if the server is running",()=>{
        expect(res.status).toBe(200); 
});

describe("Notes Route", () => {
    describe("GET /api/notes", () => {
        let res;
        beforeAll(async () => {
            res = await request(server).get("/api/notes/1");
        });
       it("should check for response status",()=>{
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(typeof res.body.notes).toBe("object");
        });
    });

    describe("POST /api/notes", () => {
        let res;
        beforeAll(async () => {
             res = await request(server)
                .post("/api/notes")
                .send({
                    title: "post_title",
                    content: "post_content",
                   
                });

       it("should check if the notes is being added",()=>{
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.updatedNotes).toBeDefined();
        });
    });

    describe("PUT /api/notes", () => {
        let res;
        beforeAll(async () => {
           res = await request(server)
                .put("/api/notes/1")
                .send({
                    title: "new_title",
                    content: "post_content",
                    
                });

   it("should check if the notes is being updated",()=>{
           expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.updatedNotes.find(e => e.id === 1).title).toBe(
                "new_title"
            );
        });
    });

    describe("DELETE /api/notes", () => {
        let res;
        beforeAll(async () => {
             res = await request(server).del("/api/notes/3");
        });

   it("should check if the notes has deleted",()=>{
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(true);
            expect(res.body.updatedNotes.find(e => e.id === 3)).toBe(undefined);
        });
    });
})})})});
