var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
var User = require("../models/user");
var Order = require("../models/order");

/**
 *
 */
router.post("/create", (req, res) => {
  var user = new User({
    name: req.body.name,
    location: req.body.location
  });

  user.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

/**
 *
 */
router.get("/:id", (req, res) => {
  var id = req.params.id;
  console.log(id);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send({ user });
    })
    .catch(e => {
      res.status(400).send();
    });
});

/**
 *
 */
router.get("/:id/orders", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  User.findById(id).then(user => {
    if (!user) {
      return res.status(404).send();
    }
  });

  Order.find({ customer: ObjectID(id) })
    .then(orders => {
      res.send({ orders });
    })
    .catch(e => {
      res.status(400).send();
    });
});

module.exports = router;
