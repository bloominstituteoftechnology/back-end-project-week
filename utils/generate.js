const faker = require('faker');

const MakeGenerator = db => ({

  makeTag() {
    let newTag = { name: faker.random.word() };
    return newTag;
  },

  makeNote(tags) {
    const note = { 
      title: faker.company.bs(),
      text_body: faker.lorem.paragraphs(faker.random.number({ min: 1, max: 6 }), '\n\r\n\r'),
      created_at: faker.date.past(),
      tags: tags || [],
    };

    return note;
  },

  makeNotes(noteNum, tagNum) {
    let tags = []
    for (let i= 0; i < tagNum; i++) {
      tags.push(new Promise(this.makeTag()));
    }

    let notes = [];
    for (let i= 0; i < noteNum; i++) {
      let tagOptions = [...tags];
      let tagsHere = Math.random() * tagOptions.length;
      for (let j = 0; j < tagsHere; i++) {

      }
      notes.push(makeNote)
    }
  }

});