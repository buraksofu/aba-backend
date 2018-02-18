// Implement a function that checks if an item can be added to courier's order list
var Courier = require("../models/courier");
var Order = require("../models/order");
const { ObjectID } = require("mongodb");

module.exports = (courier, weight, count) => {
  return new Promise((resolve, reject) => {
    var orders;
    Order.find({ courier: courier }, { item: 1 }).then(
      order => {
        orders = order;
      },
      e => {
        res.status(400).send(e);
      }
    );
  });
};
