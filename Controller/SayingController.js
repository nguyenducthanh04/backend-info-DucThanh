const model = require("../models/index");
const Saying = model.saying;
const SayingActions = require("../actions/saying.actions");
const {
    SuccessResponse,
    ErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
} = require("../cores/apiRes.js");
class SayingController {
    async getAllSaying(req, res) {
        try {
            const sayings = await SayingActions.getAllSaying();
            return new SuccessResponse().send(req, res, sayings);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
    async createSaying(req, res) {
        try {
            const { namePerson, imagePerson, saidPerson } = req.body;
            if (!namePerson && !imagePerson && !saidPerson) {
                return new BadRequestResponse().send(req, res);
            }
            const newSaying = await SayingActions.createSaying(
                namePerson,
                imagePerson,
                saidPerson
            );
            return new SuccessResponse().send(req, res, newSaying);
        } catch (error) {
            console.error(error);
            return new ErrorResponse().send(req, res);
        }
    }
}
module.exports = new SayingController();
