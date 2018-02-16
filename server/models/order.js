var mongoose = require("mongoose");
var { Item } = require("./models/Package");

var Order = mongoose.model("Order", {
  courierName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  item: {
    type: Item,
    required: true
  }
});

module.exports = { Order };
