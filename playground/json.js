const fs = require('fs');

let originalNote = {
  title: 'Some Title',
  body: 'Some Body'
}:

fs.writeFileSync('notes.json', originalNoteString)