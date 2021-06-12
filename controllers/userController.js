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
  //USER_ID, USER_PW, USER_NAME, USER_EMAIL, COMP_NAME, DEPT_NAME, USER_DIV, USER_SEX
  const {
    USER_ID,
    USER_PW,
    USER_NAME,
    USER_EMAIL,
    COMP_NAME,
    DEPT_NAME,
    USER_DIV,
    USER_SEX,
  } = req.body;
  try {
    console.log(
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV,
      USER_SEX
    );
    const result = await user.addUser([
      USER_ID,
      USER_PW,
      USER_NAME,
      USER_EMAIL,
      COMP_NAME,
      DEPT_NAME,
      USER_DIV,
      USER_SEX,
    ]);
    console.log("[userController][addUser] request success!");
    //console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteUser = async (req, res) => {
  //user_list[]가 1개만 담고 있으면, string으로 가져와서, 분기 처리
  let user_list;
  if (typeof req.body["user_list[]"] === "string")
    user_list = [req.body["user_list[]"]];
  else user_list = req.body["user_list[]"];

  try {
    console.log("[userController][deleteUser] request success!");
    await user.deleteUser(user_list);
    console.log(user_list);
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.serachUser = searchUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
