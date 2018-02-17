var mongoose = require("mongoose");

var Courier = mongoose.model("Courier", {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  itemLimit: {
    type: Number,
    required: true,
    default: 3
  },
  weightLimit: {
    type: Number,
    required: true,
    default: 5
  },
  location: { type: [Number], index: { type: "2dsphere", sparse: true } }
});

module.exports = { Courier };
