const question = require("../models/question.js");

//post : req.body, get(url) : req.query
const searchQuestion = async (req, res) => {
  const {srvy_id} = req.query;
  try {
    const result = await question.searchQuestion([srvy_id]);
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
  const { SRVY_ID, QSTN_TITL, QSTN_OPTN_1, QSTN_OPTN_2, QSTN_OPTN_3, QSTN_OPTN_4, DTL_NOTE } = req.body;
  try {
    console.log(SRVY_ID, QSTN_TITL, QSTN_OPTN_1, QSTN_OPTN_2, QSTN_OPTN_3, QSTN_OPTN_4, DTL_NOTE);
    const result = await question.addQuestion([SRVY_ID, QSTN_TITL, QSTN_OPTN_1, QSTN_OPTN_2, QSTN_OPTN_3, QSTN_OPTN_4, DTL_NOTE]);
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
  //todo : survey_id도 받아와야 함.
  let question_list;
  if (typeof req.body["question_list[]"] === "string")
    question_list = [req.body["question_list[]"]];
  else question_list = req.body["question_list[]"];

  try {
    console.log(
      "[questionController][" + arguments.callee.name + "] request success!"
    );
    await question.deleteQuestion(question_list);
    console.log(question_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchQuestion = searchQuestion;
exports.addQuestion = addQuestion;
exports.deleteQuestion = deleteQuestion;
