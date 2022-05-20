var express = require('express');
var router = express.Router();

var cors = require("cors");

var fs = require("fs")

router.use(cors())

/* GET users listing. */


router.get("/", function (req, res) {

  res.send("Hej från users routern")
})


router.get("/addcontact", function (req, res) {

  //Headers set to avoid CORS errors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );


  fs.readFile("contacts.json", function (err, data) {
    if (err) {
      console.log(err);
    }

    let users = JSON.parse(data);

    res.send(users)

  })


})


router.post("/addcontact", function (req, res) {

  fs.readFile("contacts.json", function (err, data) {

    if (err) {
      console.log(err);

      if (err.code == "ENOENT") {
        console.log("filen finns ej");

        let contacts = [{
          "name": "koko",
          "email": "kokohydmark@mail.com",
          "number": "06066060606"
        }]

        fs.writeFile("contacts.json", JSON.stringify(contacts, null, 2), function (err) {
          if (err) {
            console.log(err);
          }
        })

        res.send("Fil skapad och ny kontakt tillagd");
        return;
      }
      res.send("404 - något gick fel")
    }


    //Takes the contacts.json file, pushes the contact from the frontend application and writes over the old file
    let contacts = JSON.parse(data)

    let newContact = {
      "username": req.body.username,
      "email": req.body.email,
      "number": req.body.number
    }

    contacts.push(newContact);
    fs.writeFile("contacts.json", JSON.stringify(contacts, null, 2), function (err) {
      if (err) {
        console.log(err);
      }
    })

    res.send(contacts)

  })
})






module.exports = router;