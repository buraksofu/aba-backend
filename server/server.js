require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var UserRoute = require("./routes/user");
var CourierRoute = require("./routes/courier");
var OrderRoute = require("./routes/order");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", UserRoute);
app.use("/couriers", CourierRoute);
app.use("/orders", OrderRoute);

app.get("/", (req, res) => {
  res.send('Getir Hackathon18 "aba" backend');
  res.send("----->iste<-----");
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
