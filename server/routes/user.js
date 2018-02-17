var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var User = require("../models/user");

router.post("/create", (req, res) => {
  var user = new User({
    name: req.body.name,
    location: req.body.location
  });
  console.log(user);

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
