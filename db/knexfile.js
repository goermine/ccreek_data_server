const ROOT_DIR = require('../config/initializers').ROOT_DIR;
const ENV_FILE = require('../config/initializers').ENV_FILE;
const path = require('path');
const pathToEnv = path.resolve(ROOT_DIR, ENV_FILE);

require('dotenv').config({path: pathToEnv});

module.exports = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
};