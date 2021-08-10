const pool = require("../db.js").pool;

exports.searchSurveyUserList = async (parameters) => {
  const result = await pool.query(
    `SELECT SRVY_ID
            , SRVY_TITL
            , DTL_NOTE
            , SUBSTR(COALESCE(UPDT_TIME, INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),11,2) AS UPDT_TIME
     FROM ICTSURVEYXM
     ORDER BY SRVY_ID`,
    parameters
  );

  return result.rows;
};