const { Pool } = require("pg");

//for heroku
//MUST uncomment below when deploy!

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/*
const pool = new Pool({
  user: "postgres",
  password: "root##3804",
  host: "localhost",
  port: 5432,
  database: "stresssurveypern",
});
*/
exports.connect = function () {
  //pool error check
  pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });

  pool.connect((err, client, release) => {
    if (err) {
      return console.error("error acquiring client", err.stack);
    }
    client.query("SELECT NOW()", (err, res) => {
      release();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  });
};
exports.pool = pool;
