const model = require("../models/index");
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
        console.log("dcu nodejs: ", req.body);
        const newBlog = await MarkDownBlog.create({
            title: title,
            description: description,
            urlImageBanner: urlImageBanner,
            contentHTML: contentHTML,
            contentMarkdown: contentMD,
        });
        res.json(newBlog);
    }
}
module.exports = new BlogController();
