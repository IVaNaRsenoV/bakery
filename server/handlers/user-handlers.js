const { useControllers } = require("../services/useControllers");

class userHandlers {
    async registerHandler (req, res) {
        const { login, password } = req.body;
        await useControllers.register(login, password, res);
    }

    async loginHandler (req, res) {
        const { login, password } = req.body;
        console.log(login, password);
        await useControllers.login(res, req, login, password);
    }
}

const user = new userHandlers();

module.exports = {
    user
}