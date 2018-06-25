const mongoose = require('mongoose');
const server = require('./api/server.js');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notes')
    .then(() => {
        server.listen(port, () => console.log(`Server connected to Mongo & running on port ${port}`));
    })
    .catch(err => console.log({
        error: err.message
    }));