const request = require("supertest");
const NoteSchema = require("./NoteSchema");
const mongoose = require("mongoose");

describe('note model', () => {
    const Note = {
        title: "Who knows?",
        body: "The trouble with computers, of course, is that they're very sophisticated idiots. They do exactly what you tell them at amazing speed. Even if you order them to kill you. So if you do happen to change your mind, it's very difficult to stop them from obeying the original order. But not impossible. Have a jelly baby. Are you listening to me? It seems you have a very large rat Brigadier—maybe you should employ the services of a very large cat?",
        tags: {
                tag: "Computers",
        },
        author: "Tom Baker"
    };

    beforeAll(()=> {
        return mongoose.connect("mongodb://localhost:27017/test2Db")
    });
    afterEach(()=> {
        return NoteSchema.remove();
    });
    afterAll(()=> {
        return mongoose.disconnect();
    });

    it("should return a new note that's an object", async () => {
        const newNote = await NoteSchema.create(Note);

        expect(typeof newNote).toBe("object");
    });
    it("should return a note that has a title that's a string", async () => {
        const newNote = await NoteSchema.create(Note);
        expect(newNote.title).toBe("Who knows?");
        expect(typeof newNote.title).toBe("string")
    });
    it("should return a note that has a body that's a string", async () => {
        const newNote = await NoteSchema.create(Note)
        expect(newNote.body).toBe("The trouble with computers, of course, is that they're very sophisticated idiots. They do exactly what you tell them at amazing speed. Even if you order them to kill you. So if you do happen to change your mind, it's very difficult to stop them from obeying the original order. But not impossible. Have a jelly baby. Are you listening to me? It seems you have a very large rat Brigadier—maybe you should employ the services of a very large cat?");
        expect(typeof newNote.body).toBe("string");
    });
    it("should return a note that has tags that are part of an object", async () => {
        const newNote = await NoteSchema.create(Note)
        expect(newNote.tags).toEqual({tag: 
        "Computers"});
        expect(typeof newNote.tags).toEqual("object");
    });
    it("should return a note that has an author that's a string", async () => {
        const newNote = await NoteSchema.create(Note)
        expect(newNote.author).toBe("Tom Baker");
        expect(typeof newNote.author).toBe("string");
    });
})
