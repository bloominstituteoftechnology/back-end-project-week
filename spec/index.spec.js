const request = require("supertest");
const server = require("../index");

describe("GET /", () => {
  it("should check if the server is running", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
});

describe("Notes Route", () => {
  describe("GET /api/notes", () => {
    it("should check for response status", async () => {
      const res = await request(server).get("/api/notes");
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(typeof res.body.data).toBe("object");
    });
  });

  describe("POST /api/notes", () => {
    it("should check if the notes is being added", async () => {
      const res = await request(server)
        .post("/api/notes")
        .send({
          title: "post_title",
          content: "post_content",
          tags: ""
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.updatedNotes).toBeDefined();
    });
  });

  describe("PUT /api/notes", () => {
    it("should check if the notes is being updated", async () => {
      const res = await request(server)
        .put("/api/notes/1")
        .send({
          title: "new_title",
          content: "post_content",
          tags: ""
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.updatedNotes.find(e => e.id === 1).title).toBe(
        "new_title"
      );
    });
  });

  describe("DELETE /api/notes", () => {
    it("should check if the notes has deleted", async () => {
      const res = await request(server).del("/api/notes/3");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe(true);
      expect(res.body.updatedNotes.find(e => e.id === 3)).toBe(undefined);
    });
  });
});
