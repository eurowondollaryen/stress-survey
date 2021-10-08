const pool = require("../db.js").pool;

exports.login = async (parameters) => {
  const result = await pool.query(
    `SELECT USER_ID
            , USER_NAME
            , USER_EMAIL
            , (SELECT COMPANY_NAME FROM ICTCOMPANY X WHERE X.COMPANY_ID = A.COMP_ID) AS COMP_NAME
            , DEPT_NAME
            , USER_DIV
            , COALESCE(USER_SEX, '1') AS USER_SEX
            , INST_TIME
     FROM ICTUSER A
     WHERE USER_ID = $1
     AND USER_PW = $2`,
    parameters
  );

  return result.rows;
};