const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors')

const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

const app = new express()

app.use(cors())
app.use(helmet())
app.use(express.json())
if (process.env.ENV === 'production')
    app.use(morgan('combined'))
else
    app.use(morgan('dev'))

app.use('/', indexRouter);
app.use('/api/notes', notesRouter);
app.use(require('./middleware/index').errorHandler)

module.exports = app