const passport = require("passport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
class AuthController {
    async getDataUser(req, res) {
        const userData = {
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar,
        };
        const secretKey = crypto.randomBytes(32).toString("hex");
        const token = jwt.sign(userData, secretKey, { expiresIn: "1h" });
        const queryParams = new URLSearchParams({
            token: token,
            ...userData,
        }).toString();
        res.redirect(`http://localhost:3000/profile?${queryParams}`);
    }
    async Logout(req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.json({ message: "Logged out successfully" });
        });
    }
}
module.exports = new AuthController();
