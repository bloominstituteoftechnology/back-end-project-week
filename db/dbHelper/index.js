const db = require("../dbConfig");

module.exports = {
    async getNotes(page){
        if (page <= 1)
            return await db("Notes")
                .limit(10)
                .select();
        else
            return await db("Notes")
                .limit(10)
                .offset((page - 1) * 10)
                .select();
    },

    async getNote(id) {
        return await db(`Notes`)
            .where({
                id: id
            })
            .select();
    },

    async putNote(note) {
        return await db(`Notes`)
            .where({
                id: note.id
            })
            .update({
                content: note.content,
                title: note.title,
            });
    },

    async delNote(id) {
        return await db(`Notes`)
            .where({
                id: id
            })
            .del();
    },

    async addNote(noteData) {
        console.log("note data", noteData);
        return await db(`Notes`)
            .insert({
                content: noteData.content,
                title: noteData.title,
            })
            .returning("*");
    }
};
    
    

