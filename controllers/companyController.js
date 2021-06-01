const company = require("../models/company.js");

//post : req.body, get(url) : req.query
const searchCompany = async (req, res) => {
  const {} = req.query;
  try {
    const result = await company.searchCompany([]);
    console.log("[companyController][searchCompany] request success!");
    var responseObj = result;
    //console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addCompany = async (req, res) => {
  //USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV
  const {
    USER_ID,
    USER_PW,
    USER_NAME,
    USER_EMAIL,
    COMP_NAME,
    DEPT_NAME,
    USER_DIV,
  } = req.body;
  try {
    console.log(
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV
    );
    const result = await user.addCompany([
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV,
    ]);
    console.log("[companyController][addCompany] request success!");
    //console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteCompany = async (req, res) => {
  //company_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let company_list;
  if (typeof req.body["company_list[]"] === "string")
    company_list = [req.body["company_list[]"]];
  else company_list = req.body["company_list[]"];

  try {
    console.log("[copmpanyController][deleteCompany] request success!");
    await user.deleteUser(company_list);
    console.log(company_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchCompany = searchCompany;
exports.addCompany = addCompany;
exports.deleteCompany = deleteCompany;
