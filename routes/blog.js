var express = require("express");
var router = express.Router();

const BlogController = require("../Controller/BlogController");
router.post("/create-blog", BlogController.createBlog);
router.get("/get-blog/:title", BlogController.getBlogByTitle);
router.get("/get-all-blog", BlogController.getAllBlog);

module.exports = router;
