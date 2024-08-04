const model = require("../models/index");
const { Op } = require("sequelize");
const Blog = model.MarkDownBlog;
const Comment = model.comment;
const User = model.User;
class BlogActions {
    async getAllBlog() {
        const allBlog = await Blog.findAll();
        return allBlog;
    }
    async getBlogByTitle(title) {
        const blogByTitle = await Blog.findOne({
            where: {
                title: title,
            },
        });
        return blogByTitle;
    }
    async createBlog(
        title,
        description,
        urlImageBanner,
        contentMD,
        contentHTML
    ) {
        const newBlog = await Blog.create({
            title: title,
            description: description,
            urlImageBanner: urlImageBanner,
            contentHTML: contentHTML,
            contentMarkdown: contentMD,
        });
        return newBlog;
    }
    async addComment(blogId, userId, commentText) {
        const newComment = await Comment.create({
            blogId: blogId,
            userId: userId,
            commentText: commentText,
            parentCommentId: 0,
        });
        return newComment;
    }
    async repComment(blogId, userId, commentText, parentCommentId) {
        const newComment = await Comment.create({
            blogId: blogId,
            userId: userId,
            commentText: commentText,
            parentCommentId: parentCommentId,
        });
        return newComment;
    }
    async getCommentByBlog(blogId) {
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
        return comments;
    }
    async getCommentChild(blogId) {
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
        return commentChild;
    }
    async editComment(commentId, content) {
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
        return editComment;
    }
    async deleteComment(commentId) {
        await Comment.destroy({ where: { id: commentId } });
    }
    async getCommentByUser(userId) {
        const commentByUser = await Comment.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Blog,
                },
            ],
        });
        return commentByUser;
    }
}
module.exports = new BlogActions();
