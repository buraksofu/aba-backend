var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var _ = require("lodash");
var { ObjectID } = require("mongodb");
var Order = require("../models/order");
var isAvailable = require("../../helpers/available");

// Should be checked if order can be assigned to courier
// in case of itemLimit and weightLimit
router.post("/create", (req, res) => {
  var courierID = req.body.courier;
  var customerID = req.body.customer;
  var item = req.body.item;
  //itemID = req.body.item;

  if (!(ObjectID.isValid(courierID) && ObjectID.isValid(customerID))) {
    return res.status(404).send();
  }

  if (!isAvailable(courierID, item.weight, item.count)) {
    return res.status(400).send();
  }

  var order = new Order({
    courier: courierID,
    customer: customerID,
    item: {
      itemName: item.itemName,
      price: item.price,
      weight: item.weight,
      count: item.count
    }
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

/**
 * Update an orders count
 */

//  router.patch("/:id", (req, res) => {
//   var id = req.params.id;
//   var body = _.pick(req.body, ["count"]);

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Order.findByIdAndUpdate(id, { $set: body }, { new: true })
//     .then(order => {
//       if (!order) {
//         return res.status(404).send();
//       }

//       res.send({ order });
//     })
//     .catch(e => {
//       res.status(400).send();
//     });
// });

/**
 * Get all orders
 */
router.get("/", (req, res) => {
  Order.find().then(
    order => {
      res.send({ order });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

/**
 * Get an by ObjectID parameter
 */
router.get("/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Order.findById(id)
    .then(order => {
      if (!order) {
        return res.status(404).send();
      }

      res.send({ order });
    })
    .catch(e => {
      res.status(400).send();
    });
});

module.exports = router;
