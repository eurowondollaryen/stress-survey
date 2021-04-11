const pool = require("../db.js").pool;

exports.login = async (parameters) => {
  const result = await pool.query(
    `SELECT USER_ID, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV, INST_TIME
     FROM ICTSURVEYUSER WHERE USER_ID = $1 AND USER_PW = $2`,
    parameters
  );

  return result.rows;
};
