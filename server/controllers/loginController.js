const login = require("../models/login.js");

const dologin = (req, res) => {
  res.json(login.login([]));
};

exports.dologin = dologin;
