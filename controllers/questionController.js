const question = require("../models/question.js");

//post : req.body, get(url) : req.query
const searchQuestion = async (req, res) => {
  const {srvy_id} = req.query;
  try {
    const result = await question.searchQuestion([srvy_id]);
    console.log(
      "[questionController][searchQuestion] request success!"
    );
    var responseObj = result;
    //console.log(responseObj);
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
      "[questionController][addQuestion] request success!"
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteQuestion = async (req, res) => {
  const { SRVY_ID } = req.body;
  let question_list = req.body.question_list;
  
  try {
    console.log(
      "[questionController][deleteQuestion] request success!"
    );
    await question.deleteQuestion(question_list, SRVY_ID);
    console.log(question_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

const saveQuestion = async (req, res) => {
  //const { SRVY_ID } = req.body;
  let question_list_created = req.body.question_list_created;
  let question_list_updated = req.body.question_list_updated;
  let question_list_deleted = req.body.question_list_deleted;
  
  try {
    console.log(
      "[questionController][saveQuestion] request success!"
    );

    for(let i = 0; i < question_list_created.length; ++i) {
      await question.addQuestion(question_list_created[i]);
    }

    for(let i = 0; i < question_list_updated.length; ++i) {
      await question.updateQuestion(question_list_updated[i]);
    }

    for(let i = 0; i < question_list_deleted.length; ++i) {
      await question.deleteQuestion(question_list_deleted[i]);
    }
    
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.searchQuestion = searchQuestion;
exports.addQuestion = addQuestion;
exports.deleteQuestion = deleteQuestion;
exports.saveQuestion = saveQuestion;
