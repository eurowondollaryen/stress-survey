const survey = require("../models/survey.js");

//post : req.body, get(url) : req.query
const searchSurvey = async (req, res) => {
  const {} = req.query;
  try {
    const result = await survey.searchSurvey([]);
    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addSurvey = async (req, res) => {
  //SURVEY_ID, SURVEY_NAME, SURVEY_NAME1, DTL_NOTE
  const { SRVY_TITL, DTL_NOTE } = req.body;
  try {
    console.log(SRVY_TITL, DTL_NOTE);
    const result = await survey.addSurvey([SRVY_TITL, DTL_NOTE]);
    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );

    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteSurvey = async (req, res) => {
  let survey_list = req.body.survey_list;

  try {
    console.log(
      "[copmpanyController][" + arguments.callee.name + "] request success!"
    );
    await survey.deleteSurvey(survey_list);
    console.log(survey_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

//user에 대해 survey를 등록한다.
const registSurvey = async (req, res) => {
  const { SRVY_ID, START_TIME, END_TIME } = req.body;
  let user_list = req.body.user_list;

  try {
    //TODO: test multiple user
    for (let i = 0; i < user_list.length; ++i) {
      await survey.registSurvey([user_list[i], SRVY_ID, START_TIME, END_TIME]);
    }

    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );

    res.json({ msg: "success", errcode: "0" });
  } catch (err) {
    console.error(err.message);
    res.json({ msg: err.message, errcode: err.code });
  }
};

//현재 유저가 진행중인 설문 리스트를 가져온다.
const getUserSurveyList = async (req, res) => {
  const { USER_ID } = req.query;
  try {
    const result = await survey.getUserSurveyList([USER_ID]);
    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

//현재 유저가 진행중인 설문의 질의 목록을 가져온다.
const getUserQuestionList = async (req, res) => {
  const { USER_ID, SRVY_ID } = req.query;
  try {
    const result = await survey.getUserQuestionList([USER_ID, SRVY_ID]);
    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

//유저의 설문에 대한 답변을 제출한다.
const submitAnswer = async (req, res) => {
  //const {  } = req.body;
  let answer_list = req.body.answer_list

  try {
    for (let i = 0; i < answer_list.length; ++i) {
      await survey.submitAnswer([answer_list[i]["user_id"]
      , answer_list[i]["srvy_id"]
      , answer_list[i]["qstn_seq"]
      , answer_list[i]["qstn_ans"]]);
    }

    console.log(
      "[surveyController][" + arguments.callee.name + "] request success!"
    );

    res.json({ msg: "success", errcode: "0" });
  } catch (err) {
    console.error(err.message);
    res.json({ msg: err.message, errcode: err.code });
  }
};

exports.searchSurvey = searchSurvey;
exports.addSurvey = addSurvey;
exports.deleteSurvey = deleteSurvey;
exports.registSurvey = registSurvey;
exports.getUserSurveyList = getUserSurveyList;
exports.getUserQuestionList = getUserQuestionList;
exports.submitAnswer = submitAnswer;
