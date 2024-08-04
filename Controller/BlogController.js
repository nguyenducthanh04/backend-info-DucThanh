const model = require("../models/index");
const { Op } = require("sequelize");
const User = model.User;
const Comment = model.comment;
const MarkDownBlog = model.MarkDownBlog;
const BlogActions = require("../actions/blog.actions");
const {
    SuccessResponse,
    ErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
} = require("../cores/apiRes.js");
const blogActions = require("../actions/blog.actions");
class BlogController {
    async getAllBlog(req, res) {
        try {
            const allBlog = await BlogActions.getAllBlog();
            return new SuccessResponse().send(req, res, allBlog);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async getBlogByTitle(req, res) {
        try {
            const { title } = req.params;
            if (!title) {
                return new BadRequestResponse().send(req, res);
            }
            const blogByTitle = await BlogActions.getBlogByTitle(title);
            return new SuccessResponse().send(req, res, blogByTitle);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
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
            if (
                !title &&
                !description &&
                !urlImageBanner &&
                !contentMD &&
                !contentHTML
            ) {
                return new BadRequestResponse().send(req, res);
            }
            const newBlog = await blogActions.createBlog(
                title,
                description,
                urlImageBanner,
                contentMD,
                contentHTML
            );
            return new SuccessResponse().send(req, res, newBlog);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async incrementView(req, res) {
        try {
            const { title } = req.params;
            if (!title) {
                return new BadRequestResponse().send(req, res);
            }
            const blog = await blogActions.getBlogByTitle(title);

            if (!blog) {
                return new NotFoundResponse().send(req, res);
            }

            blog.view += 1;
            await blog.save();

            return new SuccessResponse().send(req, res);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async addComment(req, res) {
        try {
            const { blogId, userId, commentText } = req.body;
            if (!blogId && !userId && !commentText) {
                return new BadRequestResponse().send(req, res);
            }
            const newComment = await blogActions.addComment(
                blogId,
                userId,
                commentText
            );
            return new SuccessResponse().send(req, res, newComment);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async repComment(req, res) {
        try {
            const { blogId, userId, commentText, parentCommentId } = req.body;
            if (!blogId && !userId && !commentText && !parentCommentId) {
                return new BadRequestResponse().send(req, res);
            }
            const newComment = await blogActions.repComment(
                blogId,
                userId,
                commentText,
                parentCommentId
            );
            return new SuccessResponse().send(req, res, newComment);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async getCommentByBlog(req, res) {
        try {
            const { blogId } = req.params;
            if (!blogId) {
                return new BadRequestResponse().send(req, res);
            }
            const comments = await blogActions.getCommentByBlog(blogId);
            return new SuccessResponse().send(req, res, comments);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async getCommentChild(req, res) {
        try {
            const { blogId } = req.params;
            if (!blogId) {
                return new BadRequestResponse().send(req, res);
            }
            const commentChild = await blogActions.getCommentChild(blogId);
            return new SuccessResponse().send(req, res, commentChild);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async editComment(req, res) {
        try {
            const { commentId, content } = req.body;
            if (!commentId && content) {
                return new BadRequestResponse().send(req, res);
            }
            const editComment = await blogActions.editComment(
                commentId,
                content
            );
            return new SuccessResponse().send(req, res, editComment);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async deleteComment(req, res) {
        try {
            const { commentId } = req.body;
            if (!commentId) {
                return new BadRequestResponse().send(req, res);
            }
            await blogActions.deleteComment(commentId);
            return new SuccessResponse().send(req, res);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async getCommentByUser(req, res) {
        try {
            const { userId } = req.params;
            if (!userId) {
                return new BadRequestResponse().send(req, res);
            }
            const commentByUser = await blogActions.getCommentByUser(userId);
            return new SuccessResponse().send(req, res, commentByUser);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
}
module.exports = new BlogController();
