const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { user } = require("../handlers/user-handlers");
const { useControllers } = require("../services/useControllers");
const { executeQuery } = require("../model/model");
const { generateToken } = require("../services/generateToken");

router
    .post('/register', user.registerHandler)
    .post('/login', user.loginHandler)
    .get('/refresh', async (req, res) => {
    // GET ID
    try {
        const cookie = req.cookies["token"];

    // REFRESH ACCESS TOKEN AND REFRESH TOKEN
    const userData = jwt.verify(cookie, "REFRESH_SECRET_KEY")   
        const [{ id }] = await executeQuery(`
            select id from token where refreshtoken='${cookie}'
        `);

        const [{ login, password }] = await executeQuery(`
            select login, password from users where id='${id}'
        `);

        const { ACCESS_TOKEN, REFRESH_TOKEN } = generateToken(login, password);


        await executeQuery(`
            update token set refreshtoken='${REFRESH_TOKEN}' where refreshtoken='${cookie}'
        `);


        await res.cookie("token", `${REFRESH_TOKEN}`, {
                        maxAge: 15 * 30 * 60 * 1000
                    })
        
        

        res.json({
            id,
            cookie,
            ACCESS_TOKEN,
            REFRESH_TOKEN,
            userData
        });
    } catch (error) {
        res.json({
            refresh_token: "refresh token is not valid"
        });
    }
    })
    .post('/logout', useControllers.logout)
    .get('/next', function (req, res, next) {

        const authorization = req.headers?.authorization;

        if (!authorization) {
            next("user is not authorized");
        } else {
            const auth = authorization.split(" ")[1];
            next(auth)
        }

    }, function (param, req, res, next) {
        console.log(param);
        res.json({ user: param})
    })

module.exports = router;
