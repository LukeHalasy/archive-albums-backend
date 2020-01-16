require('dotenv').config();
const env = process.env;

const config = {
	PORT: env.PORT || 5000,
	DB: env.DB,
};

module.exports = config;