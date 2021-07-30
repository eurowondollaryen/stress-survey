const pool = require("../db.js").pool;

exports.searchSurvey = async (parameters) => {
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

exports.addSurvey = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTSURVEYXM(SRVY_ID, SRVY_TITL, DTL_NOTE, INST_TIME)
    VALUES(SURROGATE_NEXTVAL((SELECT MAX(SRVY_ID) FROM ICTSURVEYXM)), $1, $2, TO_CHAR(NOW(),'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

exports.deleteSurvey = async (parameters) => {
  if (parameters.length < 1) return [];

  let queryString = "DELETE FROM ICTSURVEYXM WHERE SRVY_ID IN (";
  for (let i = 0; i < parameters.length; ++i) {
    queryString += "'";
    queryString += parameters[i];
    queryString += "'";
    if (i != parameters.length - 1) queryString += ", ";
  }
  queryString += ")";
  console.log("[survey.js][deleteSurvey]" + queryString);
  const result = await pool.query(queryString + " RETURNING *");
  return result.rows;
};

exports.registSurvey = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTSURVEYUSER(USER_ID, SRVY_ID, START_TIME, END_TIME, INST_TIME)
    VALUES($1, $2, $3, $4, TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

//현재 유저가 진행중인 설문의 문항들을 가져온다.(문항들만)
exports.getUserSurvey = async (parameters) => {
  const result = await pool.query(
    `SELECT A.USER_ID
          , A.SRVY_ID
          , (SELECT X.SRVY_TITL FROM ICTSURVEYXM X WHERE X.SRVY_ID = A.SRVY_ID) AS SRVY_TITL
          , B.QSTN_SEQ
          , B.QSTN_TITL
          , B.QSTN_OPTN_1
          , B.QSTN_OPTN_2
          , B.QSTN_OPTN_3
          , B.QSTN_OPTN_4
      FROM ICTSURVEYUSER A
      INNER JOIN ICTSURVEYXD B
      ON A.SRVY_ID = B.SRVY_ID
      WHERE A.USER_ID = $1
      AND TO_CHAR(NOW(), 'YYYYMMDD') BETWEEN A.START_TIME AND A.END_TIME
      ORDER BY A.USER_ID, A.SRVY_ID, B.QSTN_SEQ`,
    parameters
  );
  return result.rows;
};
