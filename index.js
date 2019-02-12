const express = require('express');
const server = express();

server.use(express.json());

const PORT = 5050

server.get('/api/notes', (req, res) => {
    res.send('hello world')
})

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})