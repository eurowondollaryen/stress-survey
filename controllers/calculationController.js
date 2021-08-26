const calculation = require("../models/calculation.js");
const commonFunctions = require("../common/commonFunctions.js");

//post : req.body, get(url) : req.query
const calculateSurveyResult = async (req, res) => {
  const { keyStringList } = req.body;
  console.log(keyStringList);
  try {
    for(let i = 0; i < keyStringList.length; ++i) {
      let keyString = keyStringList[i].split("|");
      const result = await calculation.getCalculateData([
        keyString[0], /* USER_ID */
        keyString[1], /* SRVY_ID */
        keyString[2], /* START_DT */
        keyString[3], /* END_DT */
      ]);
      
      console.log(
        "[calculationController][calculateSurveyResult] request success!"
      );

      let maxScoreArr = [];
      let totalScoreArr = [];
      let questionCountArr = [];
      let resultArr = [];

      for(let j = 0; j < result.length; ++j) {
        maxScoreArr[result[j]["qstn_div"]] = commonFunctions.nullToZero(maxScoreArr[result[j]["qstn_div"]]) + 4;
        totalScoreArr[result[j]["qstn_div"]] = commonFunctions.nullToZero(totalScoreArr[result[j]["qstn_div"]]) + result[j]["qstn_ans"];
        questionCountArr[result[j]["qstn_div"]] = commonFunctions.nullToZero(questionCountArr[result[j]["qstn_div"]]) + 1;
      }
      
      for(let j = 0; j < maxScoreArr.length; ++j) {
        //영역별 환산점수 = (해당영역의 각 문항에 주어진 점수의 합 - 문항개수) / (해당영역의 예상가능한 최고총점 - 문항개수) * 100
        resultArr[j] = (totalScoreArr[j] - questionCountArr[j]) / (maxScoreArr[j] - questionCountArr[j]) * 100;
      }

      //계산 결과를 저장
      for(let j = 0; j < resultArr.length; ++j) {
        calculation.saveResult([keyString[0], keyString[1], keyString[2], keyString[3], j, resultArr[j]]);
      }
    }
    res.json({ message: "ok" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.calculateSurveyResult = calculateSurveyResult;
