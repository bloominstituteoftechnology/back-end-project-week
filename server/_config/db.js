const mongoose = require('mongoose');

module.exports = {
	connectTo: function(database = 'notes', host = 'localhost') {
		return mongoose.connect(`mongodb://${host}/${database}`);
	},
};

//I think I got this straight from the starter code in our auth-ii project, but I don't think this file ever actually gets used because I set up my mongoose.connect directly in the server.js. This is because mLab was giving me a headache. I could probably put the mongoose.connect back in here and call it from server.js but it's working right now and I don't want to mess it up. 
