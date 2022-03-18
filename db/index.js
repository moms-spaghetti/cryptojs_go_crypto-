const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (sql, value, cb) => {
    return pool.query(sql, value, cb);
  },
  pool: pool,
};
