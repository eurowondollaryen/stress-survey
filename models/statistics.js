const pool = require("../db.js").pool;

//유저의 설문 진행여부 확인
exports.searchSurveyUser = async (parameters) => {
  const result = await pool.query(
    `SELECT A.USER_ID
    , B.USER_NAME
    , (SELECT COMPANY_NAME FROM ICTCOMPANY X WHERE X.COMPANY_ID = B.COMP_ID) AS COMPANY_NAME
    , B.DEPT_NAME
    , A.SRVY_ID
    , C.SRVY_TITL
    , C.DTL_NOTE
    , T.START_TIME
    , T.END_TIME
    , CASE WHEN SUM(CASE WHEN QSTN_ANS = '0' THEN 1 ELSE 0 END) > 0 THEN 'N'
             ELSE 'Y'
      END AS DONE_YN
FROM ICTSURVEYUSER T
LEFT OUTER JOIN ICTSURVEYANSWER A
ON T.USER_ID = A.USER_ID
AND T.SRVY_ID = A.SRVY_ID
LEFT OUTER JOIN ICTUSER B
ON A.USER_ID = B.USER_ID
LEFT OUTER JOIN ICTSURVEYXM C
ON A.SRVY_ID = C.SRVY_ID
WHERE 1=1
AND UPPER(A.USER_ID) LIKE '%' || UPPER($1) || '%'
AND UPPER((SELECT COMPANY_NAME FROM ICTCOMPANY X WHERE X.COMPANY_ID = B.COMP_ID)) LIKE '%' || UPPER($2) || '%'
GROUP BY A.USER_ID
, B.USER_NAME
, (SELECT COMPANY_NAME FROM ICTCOMPANY X WHERE X.COMPANY_ID = B.COMP_ID)
, B.DEPT_NAME
, A.SRVY_ID
, C.SRVY_TITL
, C.DTL_NOTE
, T.START_TIME
, T.END_TIME`,
    parameters
  );

  return result.rows;
};

//유저의 설문 답변내용 확인.
exports.searchSurveyResult = async (parameters) => {
  const result = await pool.query(
    `SELECT A.USER_ID
    , B.SRVY_TITL
    , A.START_TIME
    , A.END_TIME
    , C.QSTN_SEQ
    , C.QSTN_TITL
    , C.QSTN_OPTN_1
    , C.QSTN_OPTN_2
    , C.QSTN_OPTN_3
    , C.QSTN_OPTN_4
    , CASE WHEN D.QSTN_ANS = '0' THEN '미응답'
           ELSE D.QSTN_ANS
      END AS QSTN_ANS
    , D.INST_TIME
    , D.UPDT_TIME
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
ORDER BY A.USER_ID, A.SRVY_ID, A.START_TIME, C.QSTN_SEQ`,
    parameters
  );

  return result.rows;
};
