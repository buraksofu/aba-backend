var mongoose = require("mongoose");

var User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  location: { type: [Number], index: { type: "2dsphere", sparse: true } }
  // orders: {}
});

module.exports = { User };
