const pool = require("../db.js").pool;

exports.getComboList = async (parameters) => {
  const result = await pool.query(
    `SELECT SRVY_ID
            , SRVY_TITL
     FROM ICTSURVEYXM
     ORDER BY SRVY_ID`,
    parameters
  );

  return result.rows;
};
