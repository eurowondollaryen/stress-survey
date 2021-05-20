const user = require("../models/user.js");

//post : req.body, get(url) : req.query
const searchUser = async (req, res) => {
  const {} = req.query;
  try {
    const result = await user.searchUser([]);
    console.log("[userController][searchUser] request success!");
    var responseObj = result;
    //console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

const addUser = async (req, res) => {
  //USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV
  const {
    USER_ID,
    USER_PW,
    USER_NAME,
    USER_EMAIL,
    COMP_NAME,
    DEPT_NAME,
    USER_DIV,
  } = req.body;
  try {
    console.log(
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV
    );
    const result = await user.addUser([
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV,
    ]);
    console.log("[userController][addUser] request success!");
    //console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async (req, res) => {
  //USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV
  const user_list = req.body["user_list[]"];
  try {
    console.log("[userController][deleteUser] request success!");

    console.log(user_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.serachUser = searchUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
