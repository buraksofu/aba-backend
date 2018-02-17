require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Courier } = require("./models/courier");
var { Item } = require("./models/item");
var { Order } = require("./models/order");
var UserRoute = require("./routes/user");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/user", UserRoute);

app.get("/", (req, res) => {
  res.send('Getir Hackathon18 "aba" backend');
});

app.post("/location", (req, res) => {
  // Should check if address is sent in request!
  var encodedAddress = encodeURIComponent(req.body.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCi5yPbz6YZ4EyrJsoKFZ4vaa-NBzqDc04`;
  axios
    .get(geocodeUrl)
    .then(response => {
      if (response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address.");
      }

      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      console.log(response.data.results[0].formatted_address);
      res.send({ Lat: lat, Lng: lng });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/orders", (req, res) => {
  // Should find orders of current user
  Order.find().then(
    orders => {
      res.send({ orders });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/couriers", (req, res) => {
  // Should find available couriers
  Courier.find().then(
    couriers => {
      res.send({ couriers });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// Find couriers near a geo point within a radius
// app.post("/couriersAround", (req, res) => {});

// add new orders
// app.post("/giveOrder", (req, res) => {});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
