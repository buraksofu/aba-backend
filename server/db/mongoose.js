var mongoose = require("mongoose");

console.log(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/isteApp"
);

module.exports = { mongoose };
