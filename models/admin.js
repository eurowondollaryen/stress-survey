const pool = require("../db.js").pool;

exports.searchAdmin01 = async (parameters) => {
  const result = await pool.query(
    `SELECT (SELECT SRVY_TITL FROM ICTSURVEYXM X WHERE X.SRVY_ID = A.SRVY_ID) AS SRVY_TITL
    , QSTN_DIV||'. '||DTL_NOTE AS QSTN_DIV
    , CASE WHEN USER_SEX = '0' THEN '남성'
           WHEN USER_SEX = '1' THEN '여성'
           ELSE '기타'
      END AS USER_SEX
    , START_QSTN_SEQ
    , END_QSTN_SEQ
    , CENTER_VALUE
    , RANGE_PASS_START
    , RANGE_PASS_END
    , RANGE_WARN_START
    , RANGE_WARN_END
FROM ICTSURVEYQUESTIONDIV A
ORDER BY SRVY_ID, QSTN_DIV, USER_SEX`,
    parameters
  );

  return result.rows;
};