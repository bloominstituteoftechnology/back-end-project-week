const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const db = require('knex')(require('./knexfile').development);
const HttpError = require('./utils/HttpError');

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

// helper function: add tags
const addTagsToDB = (noteId, tags) => new Promise((resolve, reject) => {
  if (tags && tags.length > 0) {
    const tagPromises = tags.map(name => db('tags')
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
          .insert({ name })
          .returning('id');
      }));
    return Promise.all(tagPromises)
      .then((tagIds) => {
        const mappings = tagIds.map(([tagId]) => ({ noteId, tagId }));
        return db('notesTagsJoin').insert(mappings);
      })
      .then(res => resolve(noteId))
      .catch((err) => {
        console.log(`warning: note was created but an error occurred in tag creation: ${err}`);
        return noteId;
      });
  }
  return resolve(noteId);
});

// helper function: clean orphan tags
const cleanTags = res => db('notesTagsJoin')
  .select('tagId')
  .distinct('tagId')
  .then((tags) => {
    const tagIds = tags.map(tag => tag.tagId);
    return db('tags')
      .whereNotIn('id', tagIds)
      .del();
  });

server.get(process.env.PATH_GET_NOTES, (req, res, next) => {
  db('notes')
    .select()
    .then((notes) => {
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
    .then(tagArr => res.status(200).json(tagArr))
    .catch(() => next(new HttpError(404, 'Database did not supply requested resources.')));
});

server.get(`${process.env.PATH_GET_NOTE}/:id`, (req, res, next) => {
  const id = Number(req.params.id);
  if (id) {
    return Promise.all([
      db('notes')
        .select()
        .where('id', '=', id)
        .first(),
      db('notesTagsJoin')
        .select(['name', 'notesTagsJoin.tagId as id'])
        .innerJoin('tags', 'notesTagsJoin.tagId', 'tags.id')
        .where('noteId', '=', Number(id)),
    ])
      .then(([note, tags]) => {
        if (note) {
          return res.status(200).json({ ...note, tags });
        }
        throw new HttpError(404, 'Database did not return a resource for this id.');
      })
      .catch(() => {
        next(new HttpError(404, 'Database could not return a resource with the id provided'));
      });
  }
  next(new HttpError(404, 'A usable id parameter was not received for this request.'));
});

server.post(process.env.PATH_POST_NOTE, (req, res, next) => {
  const {
    body: { tags, ...note },
  } = req;
  if (!note.title || note.title === '') {
    return next(new HttpError(400, 'Must provide a non-empty title for this request.'));
  }
  return db('notes')
    .insert(note)
    .returning('id')
    .then(([noteId]) => {
      if (!noteId) {
        throw new HttpError(500, 'Database did not create a new instance');
      }
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
  db('notes').where('id', '=', id)
    .del()
    .then((response) => {
      if (response === 0) {
        throw new HttpError(404, 'Requested resource could not be found in database for deletion.');
      }
      return db('notesTagsJoin')
        .where('noteId', '=', id)
        .del()
        .then(cleanTags)
        .catch(err => console.log('Note deletion completed, but an error occurred when deleting notes'));
    })
    .then(response => res.status(204).end())
    .catch((err) => {
      if (err instanceof HttpError) {
        return next(err);
      }
      return next(new HttpError(404, 'Database could not complete deletion request.'));
    });
});

server.put(`${process.env.PATH_EDIT_NOTE}/:id`, (req, res, next) => {
  if (req.body.title === '') {
    throw new HttpError(400, 'Cannot edit a note to have an empty string as title.');
  }
  const noteId = Number(req.params.id);
  const { tags, ...note } = req.body;
  let notePromise;
  if (note) {
    notePromise = db('notes')
      .where('id', '=', noteId)
      .update(note)
      .catch((err) => {
        console.log(err);
        return 0;
      });
  } else {
    notePromise = Promise.resolve(0);
  }
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
  .catch(() => next(new HttpError(500, 'Database error occured when fetching tags'))));

server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    const { code, message } = err;
    return res.status(code).json({ message });
  }
  return res.status(404).json('The requested resource could not be found.');
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT || 8000, () => {
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  });
}

module.exports = server;
