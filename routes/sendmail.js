var express = require("express");
var router = express.Router();

const SendMailController = require("../Controller/SendMailController");
router.post("/send-mail-to-Thanh", SendMailController.SendMailToThanh);

module.exports = router;
