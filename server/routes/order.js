var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Order = require("../models/user");

router.post("/createOrder", (req, res) => {
  var courierID = req.body.courier,
    customerID = req.body.customer,
    itemID = req.body.item;

  if (!(ObjectID.isValid(id) && ObjectID.isValid(id) && ObjectID.isValid(id))) {
    return res.status(404).send();
  }

  var order = new Order({
    courier: courierID,
    customer: customerID,
    item: itemID
  });

  order.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

module.exports = router;
