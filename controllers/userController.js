const login = require("../models/user.js");

//post : req.body, get(url) : req.query
const searchUser = async (req, res) => {
  const { id, password } = req.body;
  try {
    console.log(id);
    console.log(password);
    const loginResult = await login.login([id, password]);

    if (loginResult.length != 1) {
      res.json({ message: "fail" });
    } else {
      console.log("[loginController][dologin] login success!");
      var responseObj = loginResult[0];
      responseObj["message"] = "success";
      console.log(responseObj);

      //if user is admin
      if (responseObj["user_div"] === "0") {
        console.log("admin");
        res.render("admin", responseObj);
        return;
      }

      //if user is general user
      if (responseObj["user_div"] === "1") {
        console.log("not admin");
        //todo : survey.ejs : 개인정보 동의 -> 설문 2가지 진행을 한 페이지 내에서 계속한다.
        res.render("survey", responseObj);
        return;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};


exports.serachUser = searchUser;
