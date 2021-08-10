const statistics = require("../models/statistics.js");

//post : req.body, get(url) : req.query
const searchSurveyUserList = async (req, res) => {
  const {} = req.query;
  try {
    const result = await statistics.searchSurveyUserList([]);
    console.log(
      "[statisticsController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};
/*
const addSurvey = async (req, res) => {
  //SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE
  const { SRVY_TITL, DTL_NOTE } = req.body;
  try {
    console.log(SRVY_TITL, DTL_NOTE);
    const result = await survey.addSurvey([SRVY_TITL, DTL_NOTE]);
    console.log(
      "[statisticsController][" + arguments.callee.name + "] request success!"
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};
*/

exports.searchSurveyUserList = searchSurveyUserList;