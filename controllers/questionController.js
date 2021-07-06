const survey = require("../models/question.js");

//post : req.body, get(url) : req.query
const searchQuestion = async (req, res) => {
  const {} = req.query;
  try {
    const result = await survey.searchSurvey([]);
    console.log(
      "[questionController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addQuestion = async (req, res) => {
  //SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE
  const { SRVY_TITL, DTL_NOTE } = req.body;
  try {
    console.log(SRVY_TITL, DTL_NOTE);
    const result = await survey.addSurvey([SRVY_TITL, DTL_NOTE]);
    console.log(
      "[questionController][" + arguments.callee.name + "] request success!"
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteQuestion = async (req, res) => {
  //survey_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let survey_list;
  if (typeof req.body["survey_list[]"] === "string")
    survey_list = [req.body["survey_list[]"]];
  else survey_list = req.body["survey_list[]"];

  try {
    console.log(
      "[questionController][" + arguments.callee.name + "] request success!"
    );
    await survey.deleteQuestion(survey_list);
    console.log(survey_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchQuestion = searchQuestion;
exports.addQuestion = addQuestion;
exports.deleteQuestion = deleteQuestion;
