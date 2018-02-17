var mongoose = require("mongoose");

var User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
  // orders: {}
});

module.exports = User;
