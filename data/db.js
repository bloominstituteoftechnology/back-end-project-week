const mongoose = require("mongoose");
//<dbuser>:<dbpassword>@ds139970.mlab.com:39970/lambdanotes-justinh
mongodb: module.exports = {
	connectTo: function() {
		return mongoose.connect(
			encodeURI(
				"mongodb://<dbuser>:<dbpassword>@ds139970.mlab.com:39970/lambdanotes-justinh"
			),
			{ useMongoClient: true }
		);
	}
};
