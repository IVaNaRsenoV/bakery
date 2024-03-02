const jwt = require("jsonwebtoken");

function generateToken (login, password) {
    const ACCESS_TOKEN = jwt.sign(
        { login, password },
        "ACCESS_SECRET_KEY",
        { expiresIn: "15m" }    
    );

    const REFRESH_TOKEN = jwt.sign(
        { login, password },
        "REFRESH_SECRET_KEY",
        { expiresIn: "15d" }    
    );

    return {
        ACCESS_TOKEN,
        REFRESH_TOKEN
    }
}

module.exports = {
    generateToken
}