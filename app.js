const express = require('express');
const cors = require('cors');

const db = require('./database/connection');
const tasks = require('./routes/tasks/tasks');

const app = express();
const port = process.env.PORT | 5000;


app.use(express.json());
app.use(cors());
app.use('/api/tasks', tasks);

app.listen(port, () => console.log('App listening on PORT: ' + port));