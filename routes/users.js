var express = require('express');
var router = express.Router();

var cors = require("cors");

router.use(cors())

/* GET users listing. */



//It is posted but something wrong when sending back
router.get("/", function (req, res) {

  res.send("Hej från users routern")
})

router.post("/addcontact", function (req, res) {

  console.log(req.body);
  res.send(req.body.username)
})




module.exports = router;