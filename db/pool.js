require("dotenv").config();
const { Pool } = require("pg");

let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 1,
    idleTimeoutMillis: 5000,
  });
}

pool = global._pgPool;

module.exports = pool;
