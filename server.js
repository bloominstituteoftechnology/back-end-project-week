const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const endPoints = require('./endPoints');
server.use('/notes', endPoints);

// server.get('/', (req, res) => {
//     res
//         .send({ message: 'working so far' })
// })

server.get('/', async (req, res) => {
    try {
      const notes = await db('notes');
      const mot = process.env.MOT || 'No message of the day';
      res.status(200).json({ messageOfTheDay: mot, notes });
    } catch (error) {
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the notes' });
      console.error('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the notes' });
    }
  });

module.exports = server;