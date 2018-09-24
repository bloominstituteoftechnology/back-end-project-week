
exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        {note_title: 'Note Title', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title1', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title2', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title3', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title4', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title5', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title6', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title7', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1},
        {note_title: 'Note Title8', note_content: 'Morbi pellentesque esuismod vnenatis. Nulla ut nibh nunc. Phasellus diam metus. blandit ac purus a, efficitur millis cha cha cha', userId: 1}
      ]);
    });
};
