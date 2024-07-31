var express = require("express");
var router = express.Router();
const passport = require("passport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const AuthController = require("../Controller/AuthController");
/* GET home page. */
router.get("/google/redirect", passport.authenticate("google"));
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.getDataUser
);

router.get("/users", (req, res) => {
    const response = req.user;
    console.log(response);
    res.json({
        status: "success",
        data: response,
    });
});

router.post("/logout", AuthController.Logout);
module.exports = router;
