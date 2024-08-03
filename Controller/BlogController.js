const model = require("../models/index");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const User = model.User;
const Comment = model.comment;
const MarkDownBlog = model.MarkDownBlog;
class BlogController {
    async getAllBlog(req, res) {
        const allBlog = await MarkDownBlog.findAll();
        res.json(allBlog);
    }
    async getBlogByTitle(req, res) {
        const { title } = req.params;
        const blogByTitle = await MarkDownBlog.findOne({
            where: {
                title: title,
            },
        });
        res.json(blogByTitle);
    }
    async createBlog(req, res) {
        const { title, description, urlImageBanner, contentMD, contentHTML } =
            req.body;
        const newBlog = await MarkDownBlog.create({
            title: title,
            description: description,
            urlImageBanner: urlImageBanner,
            contentHTML: contentHTML,
            contentMarkdown: contentMD,
        });
        res.json(newBlog);
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
        const { blogId, userId, commentText } = req.body;
        const newComment = await Comment.create({
            blogId: blogId,
            userId: userId,
            commentText: commentText,
            parentCommentId: 0,
        });
        res.json(newComment);
    }
    async repComment(req, res) {
        const { blogId, userId, commentText, parentCommentId } = req.body;
        const newComment = await Comment.create({
            blogId: blogId,
            userId: userId,
            commentText: commentText,
            parentCommentId: parentCommentId,
        });
        res.json(newComment);
    }
    async getCommentByBlog(req, res) {
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
    }
    async getCommentChild(req, res) {
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
    }
    async editComment(req, res) {
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
