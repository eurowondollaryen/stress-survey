const statistics = require("../models/statistics.js");

//post : req.body, get(url) : req.query
const searchSurveyUser = async (req, res) => {
  const { USER_ID, COMPANY_NAME } = req.query;
  try {
    //console.log(USER_ID, COMPANY_NAME);
    const result = await statistics.searchSurveyUser([USER_ID, COMPANY_NAME]);
    console.log("[statisticsController][searchSurveyUser] request success!");
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const searchSurveyResult = async (req, res) => {
  const { USER_ID } = req.query;
  try {
    //console.log(USER_ID);
    const result = await statistics.searchSurveyResult([USER_ID]);
    console.log("[statisticsController][searchSurveyResult] request success!");
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchSurveyUser = searchSurveyUser;
exports.searchSurveyResult = searchSurveyResult;
