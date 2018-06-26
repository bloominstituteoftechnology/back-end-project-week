const mongoose = require('mongoose');

module.exports = {
	connectTo: function(database = 'notes', host = 'localhost') {
		return mongoose.connect(`mongodb://${process.env.MLABUSER}:${process.env.MLABPASS}@ds018538.mlab.com:$(process.env.MLABPORT}/notes`);
	},
};
