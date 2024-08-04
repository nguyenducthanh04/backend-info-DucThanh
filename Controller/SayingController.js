const model = require("../models/index");
const Saying = model.saying;
class SayingController {
    async getAllSaying(req, res) {
        try {
            const sayings = await Saying.findAll();
            res.json(sayings);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async createSaying(req, res) {
        try {
            const { namePerson, imagePerson, saidPerson } = req.body;
            const newSaying = await Saying.create({
                namePerson: namePerson,
                imagePerson: imagePerson,
                saidPerson: saidPerson,
            });
            res.json(newSaying);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}
module.exports = new SayingController();
