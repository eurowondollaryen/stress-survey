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
