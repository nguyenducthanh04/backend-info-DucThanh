const GoogleStrategy = require("passport-google-oauth20").Strategy;
const model = require("../models/index");
const Provider = model.Provider;
const User = model.User;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("AccessToken:", accessToken);
        console.log("RefreshToken:", refreshToken);
        console.log("Profile:", profile);
        const { id, displayName, emails, photos } = profile;
        const [{ value: email }] = emails;
        console.log("Profile email:", email);
        console.log("Display Name:", displayName);

        const provider = "google";
        let providerDetail = await Provider.findOne({
            where: {
                name: provider,
            },
        });

        if (!providerDetail) {
            providerDetail = await Provider.create({
                name: provider,
            });
        }

        const providerId = providerDetail.id;
        let user = await User.findOne({
            where: {
                email,
                providerId: providerId,
            },
        });

        if (!user) {
            user = await User.create({
                username: displayName,
                email,
                avatar: photos[0].value,
                idProfile: id,
                providerId: providerId,
            });
        }
        // const payload = {
        //     id: user.id,
        //     username: user.username,
        //     email: user.email,
        //     avatar: user.avatar,
        // };
        // const secretKey = crypto.randomBytes(32).toString("hex");
        // const token = jwt.sign(payload, secretKey, {
        //     expiresIn: "1h",
        // });
        return done(null, user);
    }
);
