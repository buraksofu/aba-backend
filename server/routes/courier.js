var express = require("express");
var router = express.Router();
var axios = require("axios");
var bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
var Courier = require("../models/courier");
var inRange = require("../../helpers/range");
var query = require("../../helpers/query");

/**
 * creates new courier document by the Courier scheme
 */
router.post("/create", (req, res) => {
  var courier = new Courier({
    name: req.body.name,
    itemLimit: req.body.itemLimit,
    weightLimit: req.body.weightLimit,
    travelDate: req.body.travelDate,
    arrivalDate: req.body.arrivalDate,
    location: req.body.location
  });

  courier.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

/**
 * returns available couriers that customer
 * can order inside a given range and by a given point object
 */
router.post("/availableByPoint", async (req, res) => {
  // retrieve all couriers location objects
  var couriers = await Courier.aggregate(query(req.body));
  var point = req.body;
  var result = inRange(point, couriers)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });

  // send them along with the req.point to the helper function "range.js"
  // respond to the client available courier locations
});

/**
 * returns available couriers that customer
 * can order inside a given range and by a given address string
 */
router.post("/availableByLocation", async (req, res) => {
  // Should check if address is sent in request!
  var encodedAddress = encodeURIComponent(req.body.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCi5yPbz6YZ4EyrJsoKFZ4vaa-NBzqDc04`;
  var couriers = await Courier.aggregate(query(point));
  var point;
  axios
    .get(geocodeUrl)
    .then(response => {
      if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address.");
      }

      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      point = { location: { lat: lat, lng: lng } };
      // console.log(response.data.results[0].formatted_address);
      var result = inRange(point, couriers).then(result => {
        res.status(200).send(result);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

/**
 * Returns all couriers sorted by their arrival time,
 * the one that returns earliest is on top
 */
router.get("/", (req, res) => {
  Courier.find({}, { name: 1, arrivalDate: 1 })
    .sort({ arrivalDate: -1 })
    .then(
      courier => {
        res.send({ courier });
      },
      e => {
        res.status(400).send(e);
      }
    );
});

/**
 * Get a courier by ObjectID parameter
 */
router.get("/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Courier.findById(id)
    .then(courier => {
      if (!courier) {
        return res.status(404).send();
      }

      res.send({ courier });
    })
    .catch(e => {
      res.status(400).send();
    });
});

module.exports = router;
