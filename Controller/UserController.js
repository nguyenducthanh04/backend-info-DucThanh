const model = require("../models/index");
const User = model.User;
const UserActions = require("../actions/user.actions");
const {
    SuccessResponse,
    ErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
} = require("../cores/apiRes.js");
class UserController {
    async getUserByName(req, res) {
        try {
            const { name } = req.params;
            const user = await UserActions.getUserByName(name);
            return new SuccessResponse().send(req, res, user);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
}
module.exports = new UserController();
