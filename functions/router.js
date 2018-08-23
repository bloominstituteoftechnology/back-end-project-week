const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

admin.initializeApp();
const db = admin.database();

router.get('/', (req, res) => {
  db.ref('notes').on('value', snapshot => {
    let notes = snapshot.val();
    if (!notes) {
      notes = {};
    }
    console.log('sending notes data', notes);
    return res.status(200).send(notes);
  }, errorObject => {
    console.log('The read failed: ' + errorObject.code);
    return res.status(500).send(JSON.stringify({'message': 'Cannot grab notes data'}));
  });
  return false;
});

router.get('/:id', (req, res) => {
  db.ref(`/notes/${req.params.id}`).on('value', snapshot => {
    let notes = snapshot.val();
    if (!notes) {
      notes = {};
    }
    console.log('sending notes data', notes);
    return res.status(200).send(notes);
  }, errorObject => {
    console.log('The read failed: ' + errorObject.code);
    return res.status(500).send(JSON.stringify({'message': 'Cannot grab notes data'}));
  });
  return false;
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({ error: 'Please provide a title for the note.' })
  } else {
    try {
      console.log(req.body);
      db.ref('notes').push(req.body);
      db.ref('notes').on('value', snapshot => {
        let notes = snapshot.val();
        if (!notes) {
          notes = {};
        }
        console.log('sending notes data');
        return res.status(200).send(notes);
      }, errorObject => {
        console.log('The read failed: ' + errorObject.code);
        return res.status(500).send(JSON.stringify({'message': 'Cannot grab notes data'}));
      });
    } catch (e) {
      return res.status(500).send({ error: 'There was an error while saving your note to the database.' });
    }
  }
  return false;
});

router.put('/:id', (req, res) => {
  console.log('req.params.id', req.params.id, 'req.body', req.body);
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({ error: 'Please provide a title for the note.' })
  } else {
    const noteRef = db.ref(`/notes/${req.params.id}`);
    noteRef.set(req.body)
    .then(() => {
      db.ref('notes').on('value', snapshot => {
        let notes = snapshot.val();
        if (!notes) {
          notes = {};
        }
        console.log('sending notes data', notes);
        return res.status(200).send(notes);
      }, errorObject => {
        console.log('The read failed: ' + errorObject.code);
        return res.status(500).send(JSON.stringify({'message': 'Cannot grab notes data'}));
      });
      return false;
    })
    .catch(error => console.log(error));
  }
  return false;
});

router.delete('/:id', (req, res) => {
  try {
    const noteRef = db.ref(`/notes/${req.params.id}`);
    noteRef.remove()
    .then(() => {
      db.ref('notes').on('value', snapshot => {
        let notes = snapshot.val();
        if (!notes) {
          notes = {};
        }
        console.log('sending notes data', notes);
        return res.status(200).send(notes);
      }, errorObject => {
        console.log('The read failed: ' + errorObject.code);
        return res.status(500).send(JSON.stringify({'message': 'Cannot grab notes data'}));
      });
      return false;
    })
    .catch(error => console.log(error));
  } catch (err) {
    res.status(500).send({ error: 'The note could not be removed.' });
  }
  return false;
});

module.exports = router;