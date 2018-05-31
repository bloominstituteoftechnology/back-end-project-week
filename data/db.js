const mongoose = require("mongoose");
//<dbuser>:<dbpassword>@ds139970.mlab.com:39970/lambdanotes-justinh
mongodb: module.exports = {
	connectTo: function() {
		return mongoose.connect(
			encodeURI(
				`mongodb://justin:password123@ds139970.mlab.com:39970/lambdanotes-justinh`
			),
			{ useMongoClient: true }
		);
	}
};
