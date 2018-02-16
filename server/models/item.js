var mongoose = require("mongoose");

var Item = mongoose.model("Item", {
  price: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

module.exports = { Item };
