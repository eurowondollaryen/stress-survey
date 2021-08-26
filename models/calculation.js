const pool = require("../db.js").pool;

//결과 계산은 server단에 데이터를 가져와서, 다시 한다.
//parameter : user_id, srvy_id, start_time(?), end_time(?)
exports.getCalculateData = async (parameters) => {
  const result = await pool.query(
    `SELECT A.USER_ID
    , A.SRVY_ID
    , A.START_TIME
    , A.END_TIME
    , C.QSTN_SEQ
    , C.DTL_NOTE
    , C.QSTN_DIV
    , C.QSTN_OPTN_1
    , C.QSTN_OPTN_2
    , C.QSTN_OPTN_3
    , C.QSTN_OPTN_4
    , CAST(D.QSTN_ANS AS INTEGER) AS QSTN_ANS
FROM ICTSURVEYUSER A
LEFT OUTER JOIN ICTSURVEYXM B
ON A.SRVY_ID = B.SRVY_ID
INNER JOIN ICTSURVEYXD C
ON B.SRVY_ID = C.SRVY_ID
LEFT OUTER JOIN ICTSURVEYANSWER D
ON A.USER_ID = D.USER_ID
AND A.SRVY_ID = D.SRVY_ID
AND C.QSTN_SEQ = D.QSTN_SEQ
WHERE A.USER_ID = $1
AND A.SRVY_ID = $2
AND A.START_TIME = $3
AND A.END_TIME = $4
ORDER BY A.USER_ID, A.SRVY_ID, A.START_TIME, C.QSTN_SEQ`,
    parameters
  );

  return result.rows;
};

exports.saveResult = async (parameters) => {
  const result = await pool.query(
    `WITH UPSERT AS
    (
      UPDATE ICTSURVEYRESULT SET
             SCORE = $6,
             UPDT_TIME = (TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
      WHERE USER_ID = $1
      AND SRVY_ID = $2
      AND START_TIME = $3
      AND END_TIME = $4
      AND QSTN_DIV = $5
      RETURNING *
    )
    INSERT INTO ICTSURVEYRESULT
    (
      USER_ID,
      SRVY_ID,
      START_TIME,
      END_TIME,
      QSTN_DIV,
      SCORE,
      INST_TIME
    )
    SELECT $1, $2, $3, $4, $5, $6, (TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'))
    WHERE NOT EXISTS(SELECT * FROM UPSERT)`,
    parameters
  );

  return result.rows;
};
