const db = require('../database/dbConfig');

module.exports = server => {
    server.get('/', home);
};

function home(req, res) {
    res.send('<h1>Rock-n-Roll!!</h1>');
};