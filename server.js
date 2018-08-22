const express = require('express');
const server = express();
const db = require('./data/dbConfig');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8000; //This line is critical, must have process.env.PORT for Heroku

server.use(express.json());
server.use(cors());

let token = jwt.sign({
  something: 'anything'
}, 'You have to know the password');

server.get('/', (req, res) => {
  res.status(200).send('App is running');
})

server.get('/notes/:id', async (req, res) => {
  if (req.params.id === 'all') {
    try {
      const notes = await db('notes');
      res.status(200).json(notes);
    } catch(err) {
      return res.status(500).send(`Ya done goofed with error: ${err}`);
    }
  } else {
    try {
      const note = await db('notes').where('id', req.params.id).first();
      const tags = await db('tags').where('note_id', req.params.id);
      note.tags = tags;
      res.status(200).json(note);
    } catch (err) {
      return res.status(500).send(`Ya done goofed with error: ${err}`)
    }
  }
});

server.get('/tags', async (req, res) => {
  try {
    const tags = await db('tags');
    res.status(200).json(tags);
  } catch(err) {
    return res.status(500).send(`Error${err}...no tags for you`)
  }
})

server.post('/notes', async(req, res) => {
  const {title, textBody} = req.body;

  try {
    const ids = await db.insert({title, textBody}).into('notes');
    const id = ids[0];

    res.status(201).json(await db('notes').where('id', id).first());
  } catch (err) {
    res.status(404).send(`${err}...notes could not be created`);
  }
});

server.post('/create-tag', async (req, res) => {
  const {text, note_id} = req.body;

  try {
    const ids = await db.insert({text, note_id}).into('tags');
    const id = ids[0];

    res.status(201).json(await db('tags').where('note_id', note_id));
  } catch(err) {
    res.status(500).send(`${err}...tag could not be created`)
  }
});

server.delete('/delete-tag/:id', async (req, res) => {
  try {
    const result = await db('tags').where('id', req.params.id).del();
    if (result > 0) {
      return res.status(200).json({status:'DELETED :)'});
    }
  } catch(err) {
    return res.status(500).send(`Server error... ->${err}`)
  }
})

server.put('/notes/:id', async(req, res) => {
  const {title, textBody} = req.body;
  try {
    const result = await db('notes').where('id', req.params.id).first().update({
      title,
      textBody
    });

    if(result > 0) {
      return res.status(200).json(await db('notes').where('id', req.params.id).first());
    };
  } catch(err) {
    res.status(500).send(`${err}...did not put`)
  }
});

server.delete('/notes/:id', async(req, res) => {
  try {
    const result = await db('notes').where('id', req.params.id).del();

    if(result > 0) {
      return res.status(200).json({result: "DELETED"})
    }
  } catch (err) {
    res.status(500).send(`Server error...${err}`)
  }
});

server.post('/register', async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  try {
    if (user.username && user.password) {
      const ids = await db.insert(user).into('users');
      const createdUser = await db('users').where('id', ids[0]).first();
      createdUser.token = token;
      res.status(200).json(createdUser);
    }
  } catch (err) {
    res.status(500).send(`Server error...${err}`)
  }
});

server.get('/register', async (req, res) => {
  try {
    res.status(200).json(await db('users'));
  } catch (err) {
    res.status(500).send(`${err}`)
  }

})

server.post('/login', async (req, res) => {
  try {
    const credentials = req.body;
    const foundUser = await db('users').where('username', credentials.username).first();

    if (foundUser) {
      const userHash = foundUser.password;
      let isValid = bcrypt.compareSync(credentials.password, userHash);
      if (isValid) {
        return res.status(200).json({message: "Logged In", user: credentials.username, token:token})
      } else {
        return res.status(401).send('Incorrect password')
      }
    } else {
      return res.status(404).send('Error, no user exists with that name')
    }

  } catch (err) {
    return res.status(401).json({message: `Server Error ${err}`});
  }
})

 server.listen(PORT, () => console.log(`App is listening with Heroku :)...on port ${PORT}`));
