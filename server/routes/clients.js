const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordConfig = require("../config");


router.get("/getClients/:firstName?", async (req, res) => {
  try {
    let {firstName} = req.params;
    firstName = firstName ? firstName : "";
    console.log(firstName);
    db.query("SELECT * FROM clients WHERE firstName LIKE (?)", [`%${firstName}%`] , (err, result) => {
        if (err) {
            return res.status(400).send("An error occured while fetching data from database");
        }
        return res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/addClient", async (req, res) => {
    try {
        const { firstName, lastName, product } = req.body;
        db.query(
          "INSERT INTO clients (firstName, lastName, product) VALUES (?,?,?)",
          [firstName, lastName, product],
          (error, result) => {
            if (error) {
              return res.status(500).send("An error occurred");
            }
            return res.status(200).send("Client created successfully");
          }
        );
    } catch (error) {
        return res.status(500).send("An error occurred");
    }
});

module.exports = router;