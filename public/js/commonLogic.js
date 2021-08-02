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

//질의 하나를 HTML로 변환하는 함수
const loadQuestion = (question) => {
  let returnStr = "<tr>";
  
  returnStr += "<td>" + question["qstn_titl"] + "</td>";
  returnStr += "<td onClick=\"checkAnswer(\'" + question["srvy_id"] + "\', " + question["qstn_seq"] + ", 1)\">" + question["qstn_optn_1"] + "</td>";
  returnStr += "<td onClick=\"checkAnswer(\'" + question["srvy_id"] + "\', " + question["qstn_seq"] + ", 2)\">" + question["qstn_optn_2"] + "</td>";
  returnStr += "<td onClick=\"checkAnswer(\'" + question["srvy_id"] + "\', " + question["qstn_seq"] + ", 3)\">" + question["qstn_optn_3"] + "</td>";
  returnStr += "<td onClick=\"checkAnswer(\'" + question["srvy_id"] + "\', " + question["qstn_seq"] + ", 4)\">" + question["qstn_optn_4"] + "</td>";

  returnStr += "</tr>";
  return returnStr;
};

//설문 리스트를 화면에 띄워주는 함수
const loadQuestionList = (questionList) => {
  let returnStr = "<table class='table table-bordered'>"
  returnStr += "<thead><tr>";
  returnStr += "<th>설문문항</th>";
  returnStr += "<th>전혀 그렇지 않다</th>";
  returnStr += "<th>약간 그렇지 않다</th>";
  returnStr += "<th>약간 그렇다</th>";
  returnStr += "<th>매우 그렇다</th>";
  returnStr += "</tr></thead><tbody>";
  for(let i = 0; i < questionList.length; ++i) {
    returnStr += loadQuestion(questionList[i]);
  }
  returnStr += "</tbody></table>";
  return returnStr;
};

//설문의 답변에 값을 체크 시 발동하는 함수
const checkAnswer = (srvyId, qstnSeq, answerNumber) => {
  console.log(srvyId, qstnSeq, answerNumber);
};

