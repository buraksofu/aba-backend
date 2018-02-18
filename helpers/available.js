// Implement a function that checks if an item can be added to courier's order list
var Courier = require("../models/courier");
var Order = require("../models/order");
const { ObjectID } = require("mongodb");

module.exports = (courier, weight, count) => {
  return new Promise((resolve, reject) => {
    Order.find({ courier: courier }, { item: 1 }).then(
      orders => {
        /* from orders array: sum item counts and compare with count,
          sum weights*count and compare with weight
          return boolean acccordingly
          */
      },
      e => {
        res.status(400).send(e);
      }
    );
  });
};
