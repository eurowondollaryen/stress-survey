const commonLogicVersion = "1.0";

//request결과인 json Array를 table body html 형태로 변환
const jsonArrayToTable = (arr, colNameArr) => {
  var returnStr = "";
  for (var i = 0; i < arr.length; ++i) {
    returnStr += "<tr>";
    for (var j = 0; j < colNameArr.length; ++j) {
      returnStr += "<td>";
      //if colName is custom tag
      if (colNameArr[j].substr(0, 1) === "<") {
        returnStr += colNameArr[j].replace("#", arr[i]["todo_id"]);
      } else {
        returnStr += arr[i][colNameArr[j]];
      }
      returnStr += "</td>";
    }
    returnStr += "</tr>";
  }
  return returnStr;
};
