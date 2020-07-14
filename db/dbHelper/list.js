const db = require('../dbConfig')

module.exports = {
    async getListsByUser(userID) {
        return await db('List').where({user_id: userID}).select()
    },

    async getLists(){
        return await db('List').select()
    },

    async addList(listData){
        return await db('List').insert({
            list_name: listData.name,
            description: listData.description,
            user_id: listData.userId
        })
    },

    async addNotes(listId, notesId){
        return await db('Lists_Notes').insert({
            list_id: listId,
            notes_id: notesId
        })
    }
}