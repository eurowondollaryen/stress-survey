const survey = require("../models/survey.js");

//post : req.body, get(url) : req.query
const searchSurvey = async (req, res) => {
  const {} = req.query;
  try {
    const result = await survey.searchSurvey([]);
    console.log("[surveyController][searchSurvey] request success!");
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addSurvey = async (req, res) => {
  //SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE
  const { SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE } = req.body;
  try {
    console.log(SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE);
    const result = await survey.addSurvey([
      SURVEY_ID,
      SURVEY_NAME,
      SURVEY_NAME1,
      DTL_NOTE,
    ]);
    console.log("[surveyController][addSurvey] request success!");

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteSurvey = async (req, res) => {
  //survey_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let survey_list;
  if (typeof req.body["survey_list[]"] === "string")
    survey_list = [req.body["survey_list[]"]];
  else survey_list = req.body["survey_list[]"];

  try {
    console.log("[copmpanyController][deleteSurvey] request success!");
    await survey.deleteSurvey(survey_list);
    console.log(survey_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchSurvey = searchSurvey;
exports.addSurvey = addSurvey;
exports.deleteSurvey = deleteSurvey;
