const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    connectTo: function (database = 'notes', host = 'germancin:secure123@159.65.170.21') {
        return mongoose.connect(`mongodb://${host}/${database}`)
            .then(conn => console.log(`Connected to MongoDB - Server:159.65.170.21 DB:${database}`))
            .catch(err => console.log('error :::: ' + err));
    },
};
