const login = require("../models/login.js");

//post : req.body, get(url) : req.query
const doLogin = async (req, res) => {
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
        res.render("admin", {});
        return;
      }

      //if user is general user
      if (responseObj["user_div"] === "1") {
        console.log("not admin");
        res.render("survey", {});
        return;
      }
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
