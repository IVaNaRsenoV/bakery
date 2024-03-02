const { Pool } = require("pg");
const { config } = require('../dbConfig');

const pool = new Pool(config);

async function executeQuery(query) {
    const client = await pool.connect();
    try {
        const result = await client.query(query);
        return result.rows;
    } finally {
        client.release();
    }
}

module.exports = {
    executeQuery
}