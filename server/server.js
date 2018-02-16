require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Courier } = require("./models/courier");
var { Item } = require("./models/item");
var { User } = require("./models/user");
var { Order } = require("./models/order");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send('Getir Hackathon18 "aba" backend');
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
