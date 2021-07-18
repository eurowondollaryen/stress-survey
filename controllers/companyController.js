const company = require("../models/company.js");

//post : req.body, get(url) : req.query
const searchCompany = async (req, res) => {
  const {} = req.query;
  try {
    const result = await company.searchCompany([]);
    console.log(
      "[companyController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addCompany = async (req, res) => {
  //COMPANY_ID, COMPANY_NAME, COMPANY_NAME1, DTL_NOTE
  const { COMPANY_ID, COMPANY_NAME, COMPANY_NAME1, DTL_NOTE } = req.body;
  try {
    console.log(COMPANY_ID, COMPANY_NAME, COMPANY_NAME1, DTL_NOTE);
    const result = await company.addCompany([
      COMPANY_ID,
      COMPANY_NAME,
      COMPANY_NAME1,
      DTL_NOTE,
    ]);
    console.log("[companyController][addCompany] request success!");

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
    await company.deleteCompany(company_list);
    console.log(company_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchCompany = searchCompany;
exports.addCompany = addCompany;
exports.deleteCompany = deleteCompany;
