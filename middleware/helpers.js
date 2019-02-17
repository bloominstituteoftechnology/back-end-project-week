const knex = require("knex");

const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

module.exports = {
  getNotes: id => {
    if (id) {
      return db("notes")
        .where("id", id)
        .first();
    } else return db("notes");
  },

  addNote: note => {
    return db('notes').insert(note)
  },

  deleteNote: (id) => {
      return db('notes').where('id', id).del()
  },

  editNote: (id, note) => {
      return db('notes').where('id', id).update(note)
  },

  login: (req, res) => {
    const creds = req.body;
    return db('users').where('username', creds.username).first()
      // .then(user => {
      //   // if (user && bcrypt.compareSync(creds.password, user.password)) {
      //   //   const token = generateToken(user);
      //   //   res.json({ message: `Welcome ${user.username}`, token });
      //   // } else {
      //   //   res.status(401).send("Shove off, faker!")
      //   // }
      //   if (user && creds.password === user.password) {
      //       res.json({ message: `Welcome ${user.username}` });
      //     } else {
      //       res.status(401).send("Shove off, faker!")
      //     }
      // }).catch(err => {
      //   res.status(500).send(err)
      // })
  }
};
