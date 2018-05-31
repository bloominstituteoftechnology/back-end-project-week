const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const users = require('./routes/api/users');
const notes = require('./routes/api/notes');
const app = express();

app.use(express.json());


app.use(passport.initialize());
app.use(helmet());
app.use(cors({}));
require('./config/passport')(passport);
//DB
const db = require('./config/keys').mongoURL;
mongoose
    .connect(db)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/notes', notes);
app.get('/testing', (req, res) => {

    res.status(200).json({message: 'Testing working'});

});

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server running on port ${port}`));