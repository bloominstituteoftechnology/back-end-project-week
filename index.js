require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const server = require('./server')

const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true
}

mongoose
    .connect(process.env.DB_HOST, options)
    .then(() => {
        console.log('Connected to mongodb!!')
        server.listen(PORT, () => {
            console.log(`Listening on ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err);
    })