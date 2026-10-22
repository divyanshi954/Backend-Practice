require("dotenv").config();

const db_path = process.env.MONGODB_URI;

module.exports = db_path;