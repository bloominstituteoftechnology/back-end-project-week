const mongoose = require("mongoose");

module.exports = {
	connectTo: function(
		database = "<dbuser>:<dbpassword>@ds139970.mlab.com:39970/lambdanotes-justinh"
	) {
		console.log(database);
		return mongoose.connect(`mongodb://${database}`);
	}
};
