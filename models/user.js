const pool = require("../db.js").pool;

exports.searchUser = async (parameters) => {
  const result = await pool.query(
    `SELECT COMP_NAME
            , DEPT_NAME
            , USER_ID
            , USER_NAME
            , USER_DIV
            , USER_PW
            , SUBSTR(COALESCE(UPDT_TIME, INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),11,2) AS UPDT_TIME
            , USER_EMAIL
     FROM ICTSURVEYUSER`,
    parameters
  );

  return result.rows;
};

exports.addUser = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTSURVEYUSER(USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV, INST_TIME)
    VALUES($1, $2, $3, $4, $5, $6, $7, TO_CHAR(NOW(),'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

exports.deleteUser = async (parameters) => {
  if (parameters.length < 1) return [];

  let queryString = "DELETE FROM ICTSURVEYUSER WHERE USER_ID IN (";
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
