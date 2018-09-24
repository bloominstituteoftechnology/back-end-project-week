const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = new express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet())
app.use(express.json())
if (process.env.ENV === 'production')
    app.use(morgan('combined'))
else
    app.use(morgan('dev'))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))