const db = require('../dbConfig');

const GET_ALL = (req, res) => {
  db('notes')
    .then(notes => res.status(200).json(notes.reverse()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong while fetching the notes.' });
    });
};

const GET_ONE = (req, res) => {
  const { id } = req.params;
  db('notes').where({ id })
    .then(note => {
      if (!note) res.status(404).json({ message: 'The requested note wasn\'t found.' });
      else res.status(200).json(note);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong while fetching the note.' });
    });
};

const POST = (req, res) => {
  const { title, text } = req.body;
  db('notes').insert({ title, text })
    .then(ids => res.status(201).json(ids[0]))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong while creating the note.' });
    })
};

const PUT = (req, res) => {
  const { id } = req.params;
  db('notes').where({ id }).update(req.body)
    .then(count => res.status(200).json(count))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong while updating the note.' });
    });
};

const DELETE = (req, res) => {
  const { id } = req.params;
  db('notes').where({ id }).del()
    .then(count => res.status(200).json(count))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong while deleting the note.' });
    });
};

module.exports = {
  GET_ALL,
  GET_ONE,
  POST,
  PUT,
  DELETE
};