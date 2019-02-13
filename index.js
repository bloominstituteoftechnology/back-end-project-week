require('dotenv').config();
const {server} = require('./Api/server');
const port = process.env.PORT || 5000;

server.get('/api/notes', (req, res) => {
    res.status(200)
    .json({message: "this is working"});
 })


server.listen(port, () => {
    console.log(`Server listening on ${port}`);
})