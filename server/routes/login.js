const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passwordConfig = require("../config");
const sha3_512 = require("js-sha3").sha3_512;

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const hashedPassword = sha3_512(password);
    db.query(
      `SELECT id,email,password,failedLoginAttempts FROM users where email = "${email}" and password = "${hashedPassword}"`,
      (error, results, fields) => {
        if (error) {
          return res.status(500).send("An error occurred");
        }
        if (results.length == 0) {
          return res.status(400).send("Email or password is incorrect");
        }

        token = jwt.sign({ user: results[0] }, process.env.TOKEN_KEY);
        return res.json({ token });
      }
    );
  } catch (error) {
    return res.status(500).send("An error occurred");
  }
});

module.exports = router;
