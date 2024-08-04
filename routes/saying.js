var express = require("express");
var router = express.Router();

const SayingController = require("../Controller/SayingController");
router.get("/get-all-saying", SayingController.getAllSaying);
router.post("/create-saying", SayingController.createSaying);
module.exports = router;
