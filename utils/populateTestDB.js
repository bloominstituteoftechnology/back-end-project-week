const populateTestDB = (db, data, tables) => {

  tables.forEach(table => {
    db(table)
      .truncate()
  }).then()
}





module.exports = populateTestDB;