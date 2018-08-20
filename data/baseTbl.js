const db = require('./db')

module.exports = {
  get: (tblName, id) => {
    return id ? db(tblName).where({id}) : db(tblName)
  },
  insert: (tblName, body) =>{
    return db(tblName).insert(body)
  },
  update: (tblName, id, body, ) => {
    return db(tblName).where({id}).update(body)
  },
  delete: (tblName, id) => {
    return db(tblName).where({id}).del()
  }  
}