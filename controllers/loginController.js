const login = require("../models/login.js");

const doLogin = async (req, res) => {
  const { id, pw } = req.body;
  try {
    const loginResult = await login.login([id, pw]);
    console.log("[loginController][dologin] id : " + id + ", pw : " + pw);
    if (loginResult.length != 1) {
      res.json({ message: "fail" });
    } else {
      console.log("[loginController][dologin] login success!");
      var responseObj = loginResult[0];
      responseObj["message"] = "success";
      res.json(responseObj);
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
