const pool = require("../db.js").pool;

exports.searchUser = async (parameters) => {
  const result = await pool.query(
    `SELECT (SELECT X.COMPANY_NAME FROM ICTCOMPANY X WHERE X.COMPANY_ID = A.COMP_ID) AS COMP_NAME
            , DEPT_NAME
            , USER_ID
            , USER_NAME
            , CASE WHEN A.USER_DIV = '0' THEN '최고 관리자'
                   WHEN A.USER_DIV = '1' THEN '관리자'
                   WHEN A.USER_DIV = '2' THEN '설문 대상자'
                   ELSE '-'
              END AS USER_DIV
            , USER_SEX
            , USER_PW
            , SUBSTR(COALESCE(UPDT_TIME, INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),11,2) AS UPDT_TIME
            , USER_EMAIL
     FROM ICTUSER A`,
    parameters
  );

  return result.rows;
};

exports.addUser = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_ID, DEPT_NAME, USER_DIV, USER_SEX, INST_TIME)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, TO_CHAR(NOW(),'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

exports.deleteUser = async (parameters) => {
  if (parameters.length < 1) return [];

  let queryString = "DELETE FROM ICTUSER WHERE USER_ID IN (";
  for (let i = 0; i < parameters.length; ++i) {
    queryString += "'";
    queryString += parameters[i];
    queryString += "'";
    if (i != parameters.length - 1) queryString += ", ";
  }
  queryString += ")";
  console.log("[user.js][deleteUser]" + queryString);
  const result = await pool.query(queryString + " RETURNING *");
  return result.rows;
};
