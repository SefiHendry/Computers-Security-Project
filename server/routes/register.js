const router = require('express').Router();
const changePasswordValidation = require('../validate_password.js')
const sha3_512 = require("js-sha3").sha3_512;

router.post("/register", changePasswordValidation, async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const hashedPassword = sha3_512(password);
        db.query("SELECT email FROM users where email=(?)", [email], async (error, results, fields) => {
            if (error) { 
                console.log(error);
                return res.status(500).send("An error occurred");
            }
            if (results.length !== 0) {
                return res.status(400).send("The account already exists");
            }
            
            db.query("INSERT INTO users (email,password,firstName,lastname) VALUES (?,?,?,?)",
                [email, hashedPassword, firstName, lastName], (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(502).send("An error occurred");
                    }
                    return res.status(200).send("User created successfully");
                });
        });
    } catch (error) {
        return res.status(500).send("An error occurred");
    }
})


module.exports = router