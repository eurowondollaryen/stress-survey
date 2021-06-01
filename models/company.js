const pool = require("../db.js").pool;

exports.searchCompany = async (parameters) => {
  const result = await pool.query(
    `SELECT COMPANY_ID
            , COMPANY_NAME
            , COMPANY_NAME_1
            , DTL_NOTE
            , SUBSTR(COALESCE(UPDT_TIME, INST_TIME),0,5)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),5,2)||'/'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),7,2)||' '||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),9,2)||':'||
              SUBSTR(COALESCE(UPDT_TIME, INST_TIME),11,2) AS UPDT_TIME
     FROM ICTCOMPANY
     ORDER BY COMPANY_ID`,
    parameters
  );

  return result.rows;
};

exports.addCompany = async (parameters) => {
  const result = await pool.query(
    `INSERT INTO ICTCOMPANY(COMPANY_ID, COMPANY_NAME, COMPANY_NAME_1, DTL_NOTE, INST_TIME)
    VALUES($1, $2, $3, $4, TO_CHAR(NOW(),'YYYYMMDDHH24MISS'))
    RETURNING *`,
    parameters
  );

  return result.rows;
};

exports.deleteCompany = async (parameters) => {
  if (parameters.length < 1) return [];

  let queryString = "DELETE FROM ICTCOMPANY WHERE COMPANY_ID IN (";
  for (let i = 0; i < parameters.length; ++i) {
    queryString += "'";
    queryString += parameters[i];
    queryString += "'";
    if (i != parameters.length - 1) queryString += ", ";
  }
  queryString += ")";
  console.log("[company.js][deleteCompany]" + queryString);
  const result = await pool.query(queryString + " RETURNING *");
  return result.rows;
};
