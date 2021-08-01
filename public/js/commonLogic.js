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

//id를 넘겨준 div에 grid 생성하기
//parameter: (grid id, data, header array)
const createGrid = function (gridId, gridData, arrColumns) {
  const grid = new tui.Grid({
    el: document.getElementById(gridId),
    data: gridData,
    scrollX: false,
    scrollY: false,
    columns: arrColumns,
  });
};

//문자열 null check
const comNullCheck = function (obj) {
  if (obj === null || obj === undefined || obj.length < 1 ) return true;
  return false;
};

//메시지 출력 공통 함수
const comMessage = function (msgId, msgTargetName) {
  if (msgId === "NULLCHECK") {
    alert(msgTargetName + "은(는) 필수 입력값입니다.");
  }
};
