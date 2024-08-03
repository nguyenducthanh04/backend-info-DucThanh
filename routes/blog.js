var express = require("express");
var router = express.Router();

const BlogController = require("../Controller/BlogController");
router.post("/create-blog", BlogController.createBlog);
router.get("/get-blog/:title", BlogController.getBlogByTitle);
router.get("/get-all-blog", BlogController.getAllBlog);
router.post("/increment-view/:title", BlogController.incrementView);
router.post("/add-comment", BlogController.addComment);
router.get("/get-all-comment/:blogId", BlogController.getCommentByBlog);
router.get("/get-comment-child/:blogId", BlogController.getCommentChild);
router.post("/rep-comment", BlogController.repComment);
router.put("/edit-comment", BlogController.editComment);
router.delete("/delete-comment", BlogController.deleteComment);
router.get("/get-comment-by-user/:userId", BlogController.getCommentByUser);
module.exports = router;
