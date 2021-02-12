const login = require("../models/login.js");

const dologin = async (req, res) => {
  const { id, pw } = req.body;
  try {
    const loginResult = await login.login([id, pw]);
    console.log("[loginController][dologin] id : " + id + ", pw : " + pw);
    if (loginResult.length != 1) {
      res.json({ message: "fail" });
    } else {
      res.json(loginResult[0]);
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.dologin = dologin;
