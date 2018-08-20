const db = require('../data/dbConfig');

module.exports = server => {
    server.get('/', test);    
};

function test(req, res) {
    res.send('<h1>Rock-n-Roll!!</h1>');
};