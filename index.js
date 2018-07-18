const express = require('express')
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

express()
    .get('/', (req, res) => res.json({ msg: '###--Connected--###' }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))


// mongoose
//     .connect('mongodb://LisaCee:TU4aFT_PRN@ds239681.mlab.com:39681/lambda-notes')
//     .then(() => {
//         console.log('Connected!!')
//         server.listen(PORT, () => {
//             console.log(`Listening on ${PORT}`)
//         })
//     })
//     .catch(err => {
//         console.log(err);
//     })