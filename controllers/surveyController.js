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
  //survey_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let survey_list;
  if (typeof req.body["survey_list[]"] === "string")
    survey_list = [req.body["survey_list[]"]];
  else survey_list = req.body["survey_list[]"];

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
  //user_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let user_list = req.body["user_list[]"];
  if (typeof req.body["user_list[]"] === "string")
    user_list = [req.body["user_list[]"]];
  else user_list = req.body["user_list[]"];

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

exports.searchSurvey = searchSurvey;
exports.addSurvey = addSurvey;
exports.deleteSurvey = deleteSurvey;
exports.registSurvey = registSurvey;
exports.getUserSurveyList = getUserSurveyList;
exports.getUserQuestionList = getUserQuestionList;
