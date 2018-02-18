// Implement a function that checks if an item can be added to courier's order list
var Courier = require("../models/courier");
var Order = require("../models/order");
const { ObjectID } = require("mongodb");

module.exports = (courier, weight, count) => {
  return new Promise((resolve, reject) => {
    if (!point.location) {
      reject("Point should have location object!");
    }
    const result = couriers.filter(
      courier =>
        geodist(
          { lat: point.location.lat, lng: point.location.lng },
          { lat: courier.location.lat, lng: courier.location.lng }
        ) <= range
    );
    resolve(result);
  });
};
