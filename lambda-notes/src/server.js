const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let notes = [
  {
    id: 1,
    Title: "Note Title",
    Content: "Welcome to Lambda School's front-end-project"
  },
  {
    id: 2,
    Title: "Note Title",
    Content: "This front-end-project will be written in JavaScript"
  },
  {
    id: 3, 
    Title: "Note Title",
    Content: "With React and Redux and less"
  },
  {
    id: 4,
    Title: "Note Title",
    Content: "It will have CSS styling"
  },
  {
    id: 5,
    Title: "Note Title",
    Content: "The project will display a list of notes and their content"
  },
  {
    id: 6,
    Title: "Note Title",
    Content: "The project will have cool extra features"
  } 
];

app.use(cors());
app.use(bodyParser.json());

app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});

app.post('/notes', (req, res) => {
  const note = { id: getNewId(), ...req.body };
  notes = [...notes, note];
  res.status(201).json(notes);
});

app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  let noteIndex = notes.findIndex(note => note.id == id);

  if (noteIndex >= 0) {
    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
    res.status(200).json(notes);
  } else {
    res
      .status(404)
      .json({ message: `The note with id ${id} does not exist.` });
  }
});

app.delete('/notes/:id', (req, res) => {
	notes = notes.filter(note => note.id != req.params.id);
	res.status(200).json(notes);
});

app.listen(4444, () => {
  console.log('server listening on port 4444');
});
