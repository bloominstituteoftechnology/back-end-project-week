const request = require("supertest");
const server = require("../index.js");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("returns a 200 (OK) status code", async () => {
      // get access to the server
      // use supertest to make a GET to the server
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("Note Routes", () => {
    describe("GET ALL notes", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/api/notes");

        expect(response.status).toEqual(200);
      });
      it("should display a list of all notes", async () => {
        const response = await request(server).get("/api/notes");

        expect(response.body).toEqual(notesData);
      });
    });

    describe("GET SINGLE note", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/api/notes/0");

        expect(response.status).toEqual(200);
      });
      it.skip("should display a list of all notes", async () => {
        const response = await request(server).get("/api/notes/0");

        expect(response.body).toEqual([notesData.notes[0]]);
      });
    });

    describe("POST new note", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/api/notes");

        expect(response.status).toEqual(200);
      });
      it("should display all notes(including new note)", async () => {
        const response = await request(server)
          .post("/api/notes")
          .send(newNote);
        const updatednoteData = notesData.notes;
        let sentNote = newNote;
        sentNote.id = notesData.notes.length.toString();
        expect(response.body).toEqual(sentNote);
      });
    });

    describe("DELETE note", () => {
      it.skip("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/api/notes");

        expect(response.status).toEqual(200);
      });
        const noteId = 1;
        const response = await request(server).delete(
          `/api/notes/${noteId}`,
        );

        expect(response.body).toEqual(newNotesArray);
      });
    });
});

