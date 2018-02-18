// Implement a function that checks if an item can be added to courier's order list
var Courier = require("../server/models/courier");
var Order = require("../server/models/order");
const { ObjectID } = require("mongodb");

module.exports = (courier, weight, count) => {
  Order.find({ courier: courier }, { item: 1 }).then(
    orders => {
      /* from orders array: sum item counts and compare with count,
          sum weights*count and compare with weight
          return boolean acccordingly
          */
      var itemSum = 0,
        weightSum = 0;
      for (var i = 0, len = orders.length; i < len; i++) {
        itemSum += orders[i].item.count;
        weightSum += orders[i].item.weight * orders[i].item.count;
      }
      if (itemSum <= count && weightSum <= weight) {
        return true;
      } else {
        return false;
      }
    },
    e => {
      res.status(400).send(e);
    }
  );
};
