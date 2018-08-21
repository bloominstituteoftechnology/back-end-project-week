exports.up = (knex, Promise) => knex.schema 
  .createTable('notesTagsJoin', (ntj) => {
    ntj.integer('noteId').references('notes.id');
    ntj.integer('tagId').references('tags.id');
    ntj.primary(['noteId', 'tagId']);
  });

exports.down = (knex, Promise) => knex.schema
  .dropTableIfExists('notesTagsJoin');
