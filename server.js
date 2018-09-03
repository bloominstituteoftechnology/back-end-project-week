const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const knex = require('knex');
const knexfile = require('./knexfile');
const HttpError = require('./utils/HttpError');

const dbEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const db = knex(knexfile[dbEnv]);

const cols = ['id', 'title', 'text_body', 'created_at', 'user_id', 'left', 'right'];
const appendCols = cols.map(col => `notes.${col}`);

const camelToSnake = obj => Object.entries(obj).reduce((accum, entry) => {
  const [key, value] = entry;
  const camelKey = key.replace(
    /([a-z])([A-Z])/g,
    match => `${match[0]}_${match[1].toLowerCase()}`,
  );
  return { ...accum, [camelKey]: value };
}, {});

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// helper function: add tags
const addTagsToDB = (noteId, tags) => new Promise((resolve) => {
  if (tags && tags.length > 0) {
    // creates transaction to handle creation of new tags in tag database
    // if needed, and to create note tag mappings
    // on notesTagsJoin table
    return db
      .transaction((trx) => {
        // create new tags if they don't exist in tags database
        const tagPromises = tags.map(name => db('tags')
          .transacting(trx)
          .select('id')
          .where('name', '=', name)
          .first()
          .then((existingId) => {
            // handle id for existing tags
            if (existingId) {
              return [existingId.id];
            }
            // handle tags that need to be created
            return db('tags')
              .transacting(trx)
              .insert({ name })
              .returning('id');
          }));
        return (
          Promise.all(tagPromises)
          // create note-tag mappings in notesTagsJoins database
            .then((tagIds) => {
              const mappings = tagIds.map(([tagId]) => ({ noteId, tagId }));
              return db('notesTagsJoin')
                .transacting(trx)
                .insert(mappings);
            })
            .then(_resultsForDebug => trx.commit())
            .catch(_resultsForDebug => trx.rollback())
        );
      })
      .then(_resultsForDebug => resolve(noteId))
      .catch((err) => {
        console.log(`warning: note was created but an error occurred in tag creation: ${err}`);
        return resolve(noteId);
      });
  }
  return resolve(noteId);
});

// helper function: cleans orphan tags in tags table that no longer have any relations to a note
const cleanTags = res => db('notesTagsJoin')
  .select('tagId')
  .distinct('tagId')
  .then((tags) => {
    const tagIds = tags.map(tag => tag.tagId);
    return db('tags')
      .whereNotIn('id', tagIds)
      .del();
  })
  .catch((err) => {
    console.log(err);
    return 0;
  });

server.get(process.env.PATH_GET_NOTES, (req, res, next) => {
  const camelCaseCols = cols.map((col, index) => {
    const processed = col.replace(/_([a-z])/, match => match[1].toUpperCase());
    return cols[index] === processed
      ? `ordered.${processed}`
      : `ordered.${cols[index]} AS "${processed}"`;
  });
  const string = `WITH RECURSIVE ordered AS (
      SELECT * FROM notes WHERE notes.left = -1
      UNION ALL 
      SELECT ${appendCols.join(', ')} FROM notes
      INNER JOIN ordered ON notes.left = ordered.id)
      SELECT ${camelCaseCols.join(', ')} FROM ordered;`;
  // get all notes from notes table
  db.raw(string)
    .then(({ rows: notes }) => {
      // get all tags for each note and add to note object
      const promiseNotes = notes.map(
        note => new Promise((resolve) => {
          db('notesTagsJoin')
            .select(['name', 'notesTagsJoin.tagId as id'])
            .where('id', '=', note.id)
            .join('tags', 'notesTagsJoin.tagId', 'tags.id')
            .then(tags => resolve({ ...note, tags }))
            .catch(() => resolve(note));
        }),
      );
      return Promise.all(promiseNotes);
    })
    .then(preppedNotes => res.status(200).json(preppedNotes))
    .catch(err => next(new HttpError(404, 'Database did not supply requested resources.')));
});

server.get(`${process.env.PATH_GET_NOTE}/:id`, (req, res, next) => {
  const camelCaseCols = cols.map((col, index) => {
    const processed = col.replace(/_([a-z])/, match => match[1].toUpperCase());
    return cols[index] === processed
      ? `notes.${processed}`
      : `notes.${cols[index]} AS ${processed}`;
  });
  const id = Number(req.params.id);
  if (id) {
    return Promise.all([
      // get note from notes table
      db('notes')
        .select(camelCaseCols)
        .where('id', '=', id)
        .first(),
      // get associated tags from tag table
      db('notesTagsJoin')
        .select(['name', 'notesTagsJoin.tagId as id'])
        .innerJoin('tags', 'notesTagsJoin.tagId', 'tags.id')
        .where('noteId', '=', Number(id)),
    ])
      .then(([note, tags]) => {
        if (note) {
          // return note with tags array included
          return res.status(200).json({ ...note, tags });
        }
        throw new HttpError(404, 'Database did not return a resource for this id.');
      })
      .catch((err) => {
        next(new HttpError(404, 'Database could not return a resource with the id provided'));
      });
  }
  return next(new HttpError(404, 'A usable id parameter was not received for this request.'));
});

server.post(process.env.PATH_POST_NOTE, (req, res, next) => {
  const {
    body: { tags, ...note },
  } = req;
  // Checks that a non-empty title is included, returns error if not
  if (!note.title || note.title === '') {
    return next(new HttpError(400, 'Must provide a non-empty title for this request.'));
  }
  // inserts new note in note table
  return db('notes')
    .select('id')
    .where('right', '=', '-1')
    .first()
    .then(
      ({ id }) => new Promise((resolve) => {
        let newId;
        return db.transaction(trx => db('notes')
          .transacting(trx)
          .where('id', '=', id)
          .update({ right: db.raw('NULL') })
          .then(_resultsForDebug => db('notes')
            .transacting(trx)
            .insert({
              ...camelToSnake(note),
              left: id,
              right: -1,
              user_id: 1,
            })
            .returning('id'))
          .then(([leftId]) => {
            newId = leftId;
            return db('notes')
              .transacting(trx)
              .where('id', '=', id)
              .update({ right: newId });
          })
          .then((_resultsForDebug) => {
            return trx.commit().then((_resultsForDebug) => {
              return resolve(newId);
            });
          })
          .catch((x) => {
            trx.rollback().then(() => resolve());
          }));
      }),
    )
    .then((noteId) => {
      if (!noteId) {
        throw new HttpError(500, 'Database did not create a new instance');
      }
      // handles adding of tags to tags and notesTagsJoin table
      return addTagsToDB(noteId, tags);
    })
    .then(id => res.status(201).json({ id }))
    .catch((err) => {
      if (err instanceof HttpError) {
        return next(err);
      }
      return next(
        new HttpError(
          403,
          'Database was not able to create a new instance. Resource may violate database constraint',
        ),
      );
    });
});

server.delete(`${process.env.PATH_DELETE_NOTE}/:id`, (req, res, next) => {
  const id = Number(req.params.id);
  // deletes note in notes table
  return db
    .transaction(trx => db('notesTagsJoin')
      .transacting(trx)
      .where('noteId', '=', id)
      .del()
      .then(cleanTags)
      .then(() => db('notes')
        .transacting(trx)
        .where('id', '=', id)
        .del())
      .then(() => db('notes')
        .transacting(trx)
        .where('right', '=', id)
        .update({ right: -1 }))
      .then(trx.commit)
      .catch(() => trx.rollback)
      .then((err) => {
        throw new HttpError(406, 'An error occurred when making changes to the database.');
      }))
    .then((response) => {
      if (response === 0) {
        throw new HttpError(404, 'Requested resource could not be found in database for deletion.');
      }
      return res.status(204).end();
    })
    .catch((err) => {
      if (err instanceof HttpError) {
        return next(err);
      }
      return next(new HttpError(404, 'Database could not complete deletion request.'));
    });
});

server.put(`${process.env.PATH_EDIT_NOTE}/:id`, (req, res, next) => {
  // checks for an acceptable title change
  if (req.body.title === '') {
    throw new HttpError(400, 'Cannot edit a note to have an empty string as title.');
  }

  const noteId = Number(req.params.id);
  const { tags, ...note } = req.body;

  // Creates promise to update fields on notes where necessary
  let notePromise;
  if (note) {
    notePromise = db('notes')
      .where('id', '=', noteId)
      .update(camelToSnake(note))
      .catch((err) => {
        console.log(err);
        return 0;
      });
  } else {
    notePromise = Promise.resolve(0);
  }

  // Creates promise to handles creation and deletion of tags as indicated
  const tagPromise = db('notesTagsJoin')
    .select('tags.id')
    .where('notesTagsJoin.noteId', '=', noteId)
    .join('tags', 'tags.id', 'notesTagsJoin.tagId')
    .then((tags) => {
      const tagIds = tags.map(tag => tag.id);
      return db('notesTagsJoin')
        .whereIn('tagId', tagIds)
        .del();
    })
    .then(res => addTagsToDB(noteId, tags))
    .then(cleanTags)
    .catch(err => console.log(err));

  // Waits for both promises to complete, then handles response to client
  return Promise.all([notePromise, tagPromise])
    .then(([editedNum]) => {
      if (editedNum > 0) {
        return res.status(204).end();
      }
      throw new HttpError(404, 'Requested resource could not be found in database for editing.');
    })
    .catch((err) => {
      if (err instanceof HttpError) {
        return next(err);
      }
      return next(new HttpError(500, 'Database could not complete edit request.'));
    });
});

server.get(process.env.PATH_GET_TAGS, (req, res, next) => db('tags')
  .select()
  .then(tags => res.status(200).json(tags))
  .catch(() => next(new HttpError(500, 'Database error occurred when fetching tags'))));

// Error handling middleware
server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }
  return res.status(404).json('The requested resource could not be found.');
});

server.put(process.env.PATH_MOVE_NOTE, (req, res, next) => {
  const { sourceId, dropId } = req.body;

  if (sourceId === dropId) {
    return res.status(200).end();
  }

  let idMap;
  return db
    .select(['notes.left', 'notes.right', { order: 1 }])
    .from('notes')
    .where('id', '=', sourceId)
    .union(function getDrop() {
      this.select(['notes.left', 'notes.right', { order: 2 }])
        .from('notes')
        .where('id', '=', dropId);
    })
    .orderBy('order')
    .then(
      ([
        { left: leftOfSource, right: rightOfSource },
        { left: leftOfDrop, right: rightOfDrop },
      ]) => {
        idMap = {
          leftOfSource,
          rightOfSource,
          leftOfDrop,
          rightOfDrop,
        };
      },
    )
    .then(resultsForDebug => db
      .transaction((trx) => {
        const firstPromises = [];
        const {
          leftOfSource, rightOfSource, leftOfDrop, rightOfDrop,
        } = idMap;

        const handleSourceNote = db('notes')
          .transacting(trx)
          .where('id', '=', sourceId)
          .update({ left: leftOfDrop, right: dropId });
        firstPromises.push(handleSourceNote);

        const handleDropNote = db('notes')
          .transacting(trx)
          .where('id', '=', dropId)
          .update({ left: sourceId });
        firstPromises.push(handleDropNote);

        return Promise.all(firstPromises)
          .then((resultsForDebug_) => {
            const secondPromises = [];

            const handleLeftOfDrop = db('notes')
              .transacting(trx)
              .update({ right: sourceId })
              .where('id', '=', leftOfDrop);
            secondPromises.push(handleLeftOfDrop);

            const handleLeftOfSource = db('notes')
              .transacting(trx)
              .update({ right: rightOfSource })
              .where('id', '=', leftOfSource);
            secondPromises.push(handleLeftOfSource);

            const handleRightOfSource = db('notes')
              .transacting(trx)
              .update({ left: leftOfSource })
              .where('id', '=', rightOfSource);
            secondPromises.push(handleRightOfSource);

            return Promise.all(secondPromises);
          })
          .then((_resultsForDebug) => {
            return trx.commit();
          })
          .catch((err) => {
            throw new HttpError(
              500,
              'A database error ocurred. The request could not be completed.',
            );
          });
      })
      .then(result => res.status(200).end())
      .catch((err) => {
        if (err instanceof HttpError) {
          return next(err);
        }
        // else
        return next(new HttpError(500, 'The transaction could not be completed.'));
      }));
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  });
}

module.exports = server;
