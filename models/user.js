const pool = require("../db.js").pool;

exports.searchUser = async (parameters) => {
  const result = await pool.query(
    `SELECT COMP_NAME
            , DEPT_NAME
            , USER_ID
            , USER_NAME
            , USER_DIV
            , SUBSTR(COALESCE(UPDT_TIME, INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),11,2) AS UPDT_TIME
            , USER_EMAIL
     FROM ICTSURVEYUSER`,
    parameters
  );

  return result.rows;
};
