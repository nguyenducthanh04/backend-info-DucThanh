const model = require("../models/index");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const User = model.User;
const Comment = model.comment;
const MarkDownBlog = model.MarkDownBlog;
class BlogController {
    async getAllBlog(req, res) {
        try {
            const allBlog = await MarkDownBlog.findAll();
            res.json(allBlog);
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async getBlogByTitle(req, res) {
        try {
            const { title } = req.params;
            const blogByTitle = await MarkDownBlog.findOne({
                where: {
                    title: title,
                },
            });
            res.json(blogByTitle);
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async createBlog(req, res) {
        try {
            const {
                title,
                description,
                urlImageBanner,
                contentMD,
                contentHTML,
            } = req.body;
            const newBlog = await MarkDownBlog.create({
                title: title,
                description: description,
                urlImageBanner: urlImageBanner,
                contentHTML: contentHTML,
                contentMarkdown: contentMD,
            });
            res.json(newBlog);
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async incrementView(req, res) {
        const { title } = req.params;
        try {
            // Tìm bài blog theo tiêu đề
            const blog = await MarkDownBlog.findOne({ where: { title } });

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            // Tăng số lượt xem
            blog.view += 1;
            await blog.save();

            res.status(200).json({ message: "View count incremented" });
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async addComment(req, res) {
        try {
            const { blogId, userId, commentText } = req.body;
            const newComment = await Comment.create({
                blogId: blogId,
                userId: userId,
                commentText: commentText,
                parentCommentId: 0,
            });
            res.json(newComment);
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async repComment(req, res) {
        try {
            const { blogId, userId, commentText, parentCommentId } = req.body;
            const newComment = await Comment.create({
                blogId: blogId,
                userId: userId,
                commentText: commentText,
                parentCommentId: parentCommentId,
            });
            res.json(newComment);
        } catch (error) {
            console.error("Error incrementing view count:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async getCommentByBlog(req, res) {
        try {
            const { blogId } = req.params;
            const comments = await Comment.findAll({
                where: {
                    blogId: blogId,
                    parentCommentId: 0,
                },
                include: [
                    {
                        model: User,
                    },
                ],
            });
            res.json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
    async getCommentChild(req, res) {
        try {
            const { blogId } = req.params;
            const commentChild = await Comment.findAll({
                where: {
                    blogId: blogId,
                    parentCommentId: {
                        [Op.ne]: 0,
                    },
                },
                include: [
                    {
                        model: User,
                    },
                ],
            });
            res.json(commentChild);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
    async editComment(req, res) {
        try {
            const { commentId, content } = req.body;
            const editComment = await Comment.update(
                {
                    commentText: content,
                },
                {
                    where: {
                        id: commentId,
                    },
                }
            );
            res.json(editComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
    async deleteComment(req, res) {
        try {
            const { commentId } = req.body;
            if (!commentId) {
                return res
                    .status(400)
                    .json({ message: "commentId is required" });
            }
            await Comment.destroy({ where: { id: commentId } });
            res.json({ message: "Delete Successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
    async getCommentByUser(req, res) {
        try {
            const { userId } = req.params;
            const commentByUser = await Comment.findAll({
                where: {
                    userId: userId,
                },
                include: [
                    {
                        model: MarkDownBlog,
                    },
                ],
            });
            res.json(commentByUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
}
module.exports = new BlogController();
