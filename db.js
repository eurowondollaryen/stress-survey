const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "root##3804",
  host: "localhost",
  port: 5432,
  database: "stresssurveypern",
});
exports.pool = pool;
