const pool = require("../db.js").pool;

exports.searchUser = async (parameters) => {
  const result = await pool.query(
    `SELECT COMP_NAME, DEPT_NAME, USER_ID, USER_NAME, USER_DIV, COALESCE(UPDT_TIME, INST_TIME) AS UPDT_TIME, USER_EMAIL
     FROM ICTSURVEYUSER`,
    parameters
  );

  return result.rows;
};
