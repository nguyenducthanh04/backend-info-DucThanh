var express = require("express");
var router = express.Router();
const model = require("../models/index");
const Provider = model.Provider;
const User = model.User;
/* GET users listing. */
router.get("/get-data", async function (req, res, next) {
    const idUser = req.user;
    const dataUser = await User.findOne({
        where: {
            idProfile: idUser,
        },
    });
    console.log("get-data-user", idUser.idProfile);
    res.json(dataUser);
});
module.exports = router;
