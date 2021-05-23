const login = require("../models/login.js");

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
    } else {
      console.log("[loginController][dologin] login success!");
      var responseObj = loginResult[0];
      responseObj["message"] = "success";
      //console.log(responseObj);

      //최고관리자
      if (responseObj["user_div"] === "0") {
        console.log("admin");
        res.render("admin", responseObj);
        return;
      }

      //일반관리자
      if (responseObj["user_div"] === "1") {
        console.log("admin");
        res.render("admin", responseObj);
        return;
      }

      //일반유저
      if (responseObj["user_div"] === "2") {
        console.log("not admin");
        //todo : survey.ejs : 개인정보 동의 -> 설문 2가지 진행을 한 페이지 내에서 계속한다.
        res.render("survey", responseObj);
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
