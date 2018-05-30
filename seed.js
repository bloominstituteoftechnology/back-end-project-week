require('dotenv').config();

const uri = process.env.MONGO_DB_URI; 

module.exports = {
	"undefined": uri,
	"dev": "localhost/DEV_DB_NAME",
	"prod": "localhost/PROD_DB_NAME"
}
