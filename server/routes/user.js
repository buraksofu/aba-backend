"use strict";

var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var User = require("../models/user");

router.post("/addUser", (req, res) => {
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

module.exports = router;
