const common = require("../models/common.js");
/*
 * 해당 함수는 공통 코드값/코드명 리스트를 가져오기 위한 함수
 */
//post : req.body, get(url) : req.query
const getComboList = async (req, res) => {
  const { COL_NAME } = req.query;
  try {
    const result = await common.getComboList([COL_NAME]);
    console.log(
      "[commonController][" + arguments.callee.name + "] request success!"
    );
    var responseObj = result;
    console.log(responseObj);
    res.json(responseObj);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getComboList = getComboList;
