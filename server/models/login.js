const pool = require("../db.js").pool;

exports.login = async (parameters) => {
  const result = await pool.query(`SELECT * FROM ICTSURVEYUSER`);

  return result.rows;
};
