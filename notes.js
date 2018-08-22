console.log('Starting notes.js');

let addNote = (title, body) => {
  console.log('Adding note', title, body)
};

let getAll = () => {
  console.log('Getting all notes',)
};

let getNote = (title) => {
  console.log('Reading note',)
};

let removeNote = (title) => {
  console.log('Removing note',)
};



module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}