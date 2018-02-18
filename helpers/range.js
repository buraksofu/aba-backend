const geodist = require("geodist");

/**
 *
 * @param {Json Object} point - geopoint object
 * @param {Array} couriers - location array of couriers
 * @param {Number} range - max range allowed from the center
 */
module.exports = (point, couriers, range = 150) => {
  return new Promise((resolve, reject) => {
    if (!point.location) {
      reject("Point should have location object!");
    }
    const result = couriers.filter(
      courier =>
        geodist(
          { lat: point.location.lat, lng: point.location.lng },
          { lat: courier.location.lat, lng: courier.location.lng },
          [{ unit: "km" }]
        ) <= range
    );
    resolve(result);
  });
};
