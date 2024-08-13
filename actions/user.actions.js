const model = require("../models/index");
const User = model.User;
const Comment = model.comment;
const Blog = model.MarkDownBlog;
class UserActions {
    async getUserByName(name) {
        const user = await User.findOne({
            where: {
                username: name,
            },
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: Blog,
                        },
                    ],
                },
            ],
        });
        return user;
    }
}
module.exports = new UserActions();
