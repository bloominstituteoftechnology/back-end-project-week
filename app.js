require('dotenv').config();

const express = require('express');
const cors = require('cors');

const db = require('./database/connection');
const registration = require('./routes/registration/registration');
const tasks = require('./routes/tasks/tasks');
const users = require('./routes/users/users');

const app = express();
const port = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());
app.use('/registration', registration);
app.use('/api/tasks', tasks);
app.use('/api/users', users);

app.listen(port, () => console.log('App listening on PORT: ' + port));