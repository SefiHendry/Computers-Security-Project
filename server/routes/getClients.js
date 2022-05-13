const router = require("express").Router();

router.get("/getClients", async (req, res) => {
  try {
    db.query("SELECT * FROM clients", (err, result) => {
      if (err) {
        return res
          .status(400)
          .send("An error occured while fetching data from database");
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;