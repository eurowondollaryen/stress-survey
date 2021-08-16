const calculation = require("../models/calculation.js");

//post : req.body, get(url) : req.query
const calculateSurveyResult = async (req, res) => {
  const { USER_ID, SRVY_ID, START_TIME, END_TIME } = req.body;
  try {
    //console.log(USER_ID, COMPANY_NAME);
    const result = await calculation.getCalculateData([USER_ID, SRVY_ID, START_TIME, END_TIME]);
    //todo: calculate and save result with result
    console.log("[calculationController][calculateSurveyResult] request success!");
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

exports.calculateSurveyResult = calculateSurveyResult;