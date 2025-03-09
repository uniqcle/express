const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONNECT + process.env.DB_NAME + "?authSource=admin"
);

module.exports = mongoose; 