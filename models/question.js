const pool = require("../db.js").pool;

exports.searchQuestion = async (parameters) => {
  const result = await pool.query(
    `SELECT A.SRVY_TITL
            , B.QSTN_SEQ
            , B.QSTN_TITL
            , B.QSTN_OPTN_1
            , B.QSTN_OPTN_2
            , B.QSTN_OPTN_3
            , B.QSTN_OPTN_4
            , B.DTL_NOTE
            , SUBSTR(COALESCE(B.UPDT_TIME, B.INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(B.UPDT_TIME, B.INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(B.UPDT_TIME, B.INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(B.UPDT_TIME, B.INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(B.UPDT_TIME, B.INST_TIME),11,2) AS UPDT_TIME
     FROM ICTSURVEYXM A
     INNER JOIN ICTSURVEYXD B
     ON A.SRVY_ID = B.SRVY_ID
     WHERE A.SRVY_ID = $1
     ORDER BY B.QSTN_SEQ`,
    parameters
  );

  return result.rows;
};

exports.addQuestion = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTSURVEYXD(SRVY_ID, QSTN_SEQ, QSTN_TITL, QSTN_OPTN_1, QSTN_OPTN_2, QSTN_OPTN_3, QSTN_OPTN_4, DTL_NOTE, INST_TIME)
    VALUES(CAST($1 AS VARCHAR), (SELECT COALESCE(MAX(QSTN_SEQ), 0) FROM ICTSURVEYXD WHERE SRVY_ID = $1) + 1, $2, $3, $4, $5, $6, $7, TO_CHAR(NOW(),'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

exports.deleteQuestion = async (parameters, SRVY_ID) => {
  if (parameters.length < 1) return [];

  let queryString = "DELETE FROM ICTSURVEYXD WHERE SRVY_ID = '" + SRVY_ID + "' AND QSTN_SEQ IN (";
  for (let i = 0; i < parameters.length; ++i) {
    queryString += "'";
    queryString += parameters[i];
    queryString += "'";
    if (i != parameters.length - 1) queryString += ", ";
  }
  queryString += ")";
  console.log("[question.js][deleteQuestion]" + queryString);
  const result = await pool.query(queryString + " RETURNING *");
  return result.rows;
};
