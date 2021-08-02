const login = require("../models/login.js");
const survey = require("../models/survey.js");

//post : req.body, get(url) : req.query
const doLogin = async (req, res) => {
  const { id, password } = req.body;
  try {
    console.log(id);
    console.log(password);
    const loginResult = await login.login([id, password]);

    if (loginResult.length != 1) {
      res.render("error", {
        code: "ERR002",
        message: "ID 또는 비밀번호가 틀렸습니다.",
      });
    } else {//로그인 성공 시
      console.log("[loginController][dologin] login success!");
      var responseObj = loginResult[0];
      responseObj["message"] = "success";
      //console.log(responseObj);

      //최고관리자
      if (responseObj["user_div"] === "0") {
        res.render("admin", {
          responseObj: responseObj
        });
        return;
      }

      //일반관리자
      if (responseObj["user_div"] === "1") {
        res.render("admin", {
          responseObj: responseObj
        });
        return;
      }

      //일반유저
      if (responseObj["user_div"] === "2") {
        //todo : survey.ejs : 개인정보 동의 -> 설문 2가지 진행을 한 페이지 내에서 계속한다.
        const userSurveyResult = await survey.getUserSurvey([id]);
        const userSurveyList = await survey.getUserSurveyList([id]);
        res.render("survey", {
          responseObj: responseObj,
          userSurveyList: userSurveyList.length === 0 ? null : userSurveyList,
          userSurveyResult: userSurveyResult.length === 0 ? null : userSurveyResult
        });
        return;
      }

      res.render("error", {
        code: "ERR001",
        message: "존재하지 않는 유저 구분입니다.",
      });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const checkLogin = async (req, res) => {
  const { token } = req.body;
  try {
    //todo : find online user with the token,
    //todo : if there is no user, return message false
  } catch (err) {
    console.error(err.message);
  }
};

exports.doLogin = doLogin;
exports.checkLogin = checkLogin;
