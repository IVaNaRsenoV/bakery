const { executeQuery } = require("../model/model");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { generateToken } = require("./generateToken");
const { sqlHandlers } = require("./sqlHanlders");
const { json } = require('express');

const {
    query,
    createTable,
    createTableToken,
    selectRowsFromTable,
    insertInto,
    insertIntoToken
} = sqlHandlers;

class useControllerScervices {
    async register(login, password, res) {

        const id = v4();
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const { ACCESS_TOKEN, REFRESH_TOKEN } = generateToken(login, password);

        // INSERT INTO VALUES TO TABLES
        const queryInsert = insertInto(id, login, hashedPassword);
        const queryInsertToken = insertIntoToken(id, REFRESH_TOKEN);

        const [{ exists }] = await executeQuery(query);

        // await res.cookie("token", `${REFRESH_TOKEN}`, {
        //                     maxAge: 15 * 30 * 60 * 1000
        //                 })

        if (exists) {
            console.log('Table users exists');
            const selectData = await executeQuery(selectRowsFromTable(login));
            if(selectData.length > 0) {
                res.json({
                    users: "This user is exist"
                })
            } else {
                 await executeQuery(queryInsert);
                 await executeQuery(queryInsertToken);
                 res.json({ ACCESS_TOKEN })
            }
        } else {
            await executeQuery(createTable);
            await executeQuery(createTableToken);
            await executeQuery(queryInsert);
            await executeQuery(queryInsertToken);
            console.log("Table does not exist");
            res.json({ ACCESS_TOKEN })
        }
    }

    async login(res, req, loginSimple, passwordSimple) {

        console.log(loginSimple, passwordSimple);

        const [{ exists }] = await executeQuery(`
            select exists (
                select 1
                from users
                where login = '${loginSimple}'
            )
        `);

        // const authorization = req.headers.authorization.split(" ")[1];
        // console.log(authorization);

        if (exists) {
            const candidate = await executeQuery(`
                select id, login, password from users where login='${loginSimple}'
            `);

            const [{ id, login, password }] = candidate;

            if (login != loginSimple) res.json({ msg: "This user`s email is not exist" })
            
            const comparePassword = await bcrypt.compare(passwordSimple, password);

            if (comparePassword) {
                const [{ exists }] = await executeQuery(`
                    select exists (
                        select 1
                        from token
                        where id='${id}'
                    )
                `);

                if (exists) {
                    const [{ refreshtoken }] = await executeQuery(`
                        select id, refreshtoken from token where id='${id}'
                    `);

                    // GENERATE NEW TOKENS
                    const { ACCESS_TOKEN, REFRESH_TOKEN } = await generateToken(login, password);
                    await executeQuery(`
                        update token set refreshtoken='${REFRESH_TOKEN}' where refreshtoken='${refreshtoken}'
                    `);

                    // Add to the cookie refresh token
                    console.log("refresh token has to update")
                    await res.cookie("token", `${REFRESH_TOKEN}`, {
                                                httpOnly: true,
                                                maxAge: 15 * 30 * 60 * 1000,
                                            })

                    res.json({ ACCESS_TOKEN })
                } else {
                    // Token is not this
                    const { ACCESS_TOKEN, REFRESH_TOKEN } = generateToken(login, password);
                    await res.cookie("token", `${REFRESH_TOKEN}`, {
                            httpOnly: true,
                            maxAge: 15 * 30 * 60 * 1000
                        })
                    // const REFRESH_TOKEN = req.cookies['token'];
                    await executeQuery(`
                        insert into token (id, refreshtoken) values (
                            '${id}',
                            '${REFRESH_TOKEN}'
                            )
                        `);

                    res.json({ ACCESS_TOKEN });

                    // res.json({ msg: "refreshtoken login" })
                }
            } else {
                res.json({ password: "Password is not right!"});
            }

        } else {
            res.json({ login: "This login does not exist!" })
        }
    }

    async logout (req, res) {
        const cookie = req.cookies["token"]
        res.clearCookie("token");
        if (!!cookie) {
             const [{ id }] = await executeQuery(`
                select id from token where refreshtoken='${cookie}'
            `);
            await executeQuery(`
                delete from token where id = '${id}'
            `);
            res.json({
                msg: "Record`s refreshtoken was deleted from token table!",
                cookie
            })
        } else {
            res.json({
                cookie: `${cookie}`,
                user: "user has gone!"
            })
        }
    }
}

const useControllers = new useControllerScervices();

module.exports = {
    useControllers
};
