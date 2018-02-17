var mongoose = require("mongoose");

var Item = mongoose.model("Item", {
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

module.exports = Item;
