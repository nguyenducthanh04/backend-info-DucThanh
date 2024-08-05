const model = require("../models/index");
const Saying = model.saying;
class SayingActions {
    async getAllSaying() {
        const sayings = await Saying.findAll();
        return sayings;
    }
    async createSaying(namePerson, imagePerson, saidPerson) {
        const newSaying = await Saying.create({
            namePerson: namePerson,
            imagePerson: imagePerson,
            saidPerson: saidPerson,
        });
        return newSaying;
    }
}
module.exports = new SayingActions();
