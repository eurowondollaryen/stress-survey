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
    VALUES($1, $2, REPLACE($3, '-', ''), REPLACE($4, '-', ''), TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

//현재 유저가 진행중인 설문 리스트를 가져온다.
exports.getUserSurveyList = async (parameters) => {
  const result = await pool.query(
    `SELECT A.USER_ID
    , A.SRVY_ID
    , B.SRVY_TITL
    , A.START_TIME
    , A.END_TIME
    , SUM(CASE WHEN D.QSTN_SEQ IS NOT NULL AND D.QSTN_ANS != '0' THEN 1 ELSE 0 END) AS ANS_CNT
    , COUNT(1) AS QSTN_CNT
FROM ICTSURVEYUSER A
INNER JOIN ICTSURVEYXM B
ON A.SRVY_ID = B.SRVY_ID
INNER JOIN ICTSURVEYXD C
ON B.SRVY_ID = C.SRVY_ID
LEFT OUTER JOIN ICTSURVEYANSWER D
ON A.USER_ID = D.USER_ID
AND C.SRVY_ID = D.SRVY_ID
AND C.QSTN_SEQ = D.QSTN_SEQ
WHERE A.USER_ID = $1
AND TO_CHAR(NOW(), 'YYYYMMDD') BETWEEN A.START_TIME AND A.END_TIME
GROUP BY A.USER_ID, A.SRVY_ID, B.SRVY_TITL, A.START_TIME, A.END_TIME
ORDER BY A.USER_ID, A.SRVY_ID`,
    parameters
  );
  return result.rows;
};

//현재 유저가 진행중인 설문의 문항들을 가져온다.
exports.getUserQuestionList = async (parameters) => {
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
          , COALESCE(C.QSTN_ANS, NULL, '0', C.QSTN_ANS) AS QSTN_ANS
      FROM ICTSURVEYUSER A
      INNER JOIN ICTSURVEYXD B
      ON A.SRVY_ID = B.SRVY_ID
      LEFT OUTER JOIN ICTSURVEYANSWER C
      ON A.USER_ID = C.USER_ID
      AND A.SRVY_ID = C.SRVY_ID
      AND B.QSTN_SEQ = C.QSTN_SEQ
      WHERE A.USER_ID = $1
      AND A.SRVY_ID = $2
      AND TO_CHAR(NOW(), 'YYYYMMDD') BETWEEN A.START_TIME AND A.END_TIME
      ORDER BY A.USER_ID, A.SRVY_ID, B.QSTN_SEQ`,
    parameters
  );
  return result.rows;
};

//유저가 제출한 답변을 저장한다.
exports.submitAnswer = async (parameters) => {
  const result = await pool.query(
    `WITH UPSERT AS
    (
      UPDATE ICTSURVEYANSWER SET
             QSTN_ANS = $4,
             UPDT_TIME = (TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
      WHERE USER_ID = $1
      AND SRVY_ID = $2
      AND QSTN_SEQ = $3
      RETURNING *
    )
    INSERT INTO ICTSURVEYANSWER
    (
      USER_ID,
      SRVY_ID,
      QSTN_SEQ,
      QSTN_ANS,
      INST_TIME
    )
    SELECT $1, $2, $3, $4, (TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
    WHERE NOT EXISTS(SELECT * FROM UPSERT)`,
    parameters
  );

  return result.rows;
};

