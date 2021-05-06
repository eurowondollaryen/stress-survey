const user = require("../models/user.js");

//post : req.body, get(url) : req.query
const searchUser = async (req, res) => {
  const { } = req.body;
  try {
    const userResult = await user.searchUser([]);
    console.log("[userController][searchUser] request success!");
    var responseObj = userResult;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

exports.serachUser = searchUser;
