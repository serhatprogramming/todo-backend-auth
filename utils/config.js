// config.js
require("dotenv").config();

const config = {
  mongodbURI:
    process.env.NODE_ENV === "TEST_ENV"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI,
  port: process.env.PORT,
};

module.exports = config;
