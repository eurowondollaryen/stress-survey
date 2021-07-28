/*
 * global_xxx_list : 조회 시 서버로부터 response 받는 값
 * selected_xxx_list : 체크박스 체크된 xxx list
 */

//for menu a01
let global_user_list;
let selected_user_list = [];

//for menu a02
let global_company_list;
let selected_company_list = [];

//for menu b01
let global_survey_list;
let selected_survey_list = [];

//for menu b02
let global_question_list;
let selected_question_list = [];

const arrColumnsA01 = [
  {
    header: "소속",
    name: "comp_name",
  },
  {
    header: "부서",
    name: "dept_name",
  },
  {
    header: "ID",
    name: "user_id",
  },
  {
    header: "PW",
    name: "user_pw",
  },
  {
    header: "성명",
    name: "user_name",
  },
  {
    header: "사용자구분",
    name: "user_div",
  },
  {
    header: "최종수정시간",
    name: "updt_time",
  },
];

const arrColumnsA02 = [
  {
    header: "회사ID",
    name: "company_id",
  },
  {
    header: "회사명",
    name: "company_name",
  },
  {
    header: "회사명1",
    name: "company_name_1",
  },
  {
    header: "비고",
    name: "dtl_note",
  },
  {
    header: "최종수정시간",
    name: "updt_time",
  },
];

const arrColumnsB01 = [
  {
    header: "설문ID",
    name: "srvy_id",
  },
  {
    header: "설문명",
    name: "srvy_titl",
  },
  {
    header: "비고",
    name: "dtl_note",
  },
  {
    header: "최종수정시간",
    name: "updt_time",
  },
];

const arrColumnsB02 = [
  {
    header: "설문제목",
    name: "srvy_titl",
  },
  {
    header: "질의순번",
    name: "qstn_seq",
  },
  {
    header: "질의제목",
    name: "qstn_titl",
  },
  {
    header: "가중치(전혀 그렇지 않다)",
    name: "qstn_optn_1",
  },
  {
    header: "가중치(약간 그렇지 않다)",
    name: "qstn_optn_2",
  },
  {
    header: "가중치(약간 그렇다)",
    name: "qstn_optn_3",
  },
  {
    header: "가중치(매우 그렇다)",
    name: "qstn_optn_4",
  },
  {
    header: "비고",
    name: "dtl_note",
  },
  {
    header: "수정시간",
    name: "updt_time",
  },
];

const global_Menu = {
  a01: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>사용자 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-user' onClick='searchUser()'>조회</button>
  <button class='btn btn-success' id='btn-add-user' data-toggle="modal" data-target="#addUserModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-user' onClick='deleteUser()'>삭제</button>
  </div>
  <div>
  <select class="form-select form-control m-2" id="sel-regist-srvy-id">
  </select>
  <input type="date" id="inpSTART_TIME" />
  <input type="date" id="inpEND_TIME" />
  <button class='btn btn-info' id='btn-regist-survey' onClick='registSurvey()'>설문 등록하기</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>사용자 목록</h4>
    <div id='grid-user-list'></div>
  </div>
</div>`,
  a02: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>회사 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-company' onClick='searchCompany()'>조회</button>
  <button class='btn btn-success' id='btn-add-company' data-toggle="modal" data-target="#addCompanyModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-company' onClick='deleteCompany()'>삭제</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>회사 목록</h4>
    <div id='grid-company-list'></div>
  </div>
</div>`,
  /* 설문관리 */
  b01: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>설문 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-survey' onClick='searchSurvey()'>조회</button>
  <button class='btn btn-success' id='btn-add-survey' data-toggle="modal" data-target="#addSurveyModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-survey' onClick='deleteSurvey()'>삭제</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>설문 목록</h4>
    <div id='grid-survey-list'></div>
  </div>
</div>`,
  b02: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>문항 관리<strong></h3>
  <div class="form-group">
  <select class="form-select form-control m-2" id="sel-srvy-id">
  </select>
  <button class='btn btn-primary' id='btn-search-question' onClick='searchQuestion()'>조회</button>
  <button class='btn btn-success' id='btn-add-question' data-toggle="modal" data-target="#addQuestionModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-question' onClick='deleteQuestion()'>삭제</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>문항 목록</h4>
    <div id='grid-question-list'></div>
  </div>
</div>`,
  /* 통계관리 */
  c01: `<div class="mt-5 p-4 card shadow login-wrapper">
  <img src="/img/Changjo_LOG.jpg" class="login-logo mt-5" />
  <h3 class="text-center mt-3">직무스트레스 평가시스템</h3>
  답변 현황 조회
</div>`,
  c02: `<div class="mt-5 p-4 card shadow login-wrapper">
  <img src="/img/Changjo_LOG.jpg" class="login-logo mt-5" />
  <h3 class="text-center mt-3">직무스트레스 평가시스템</h3>
  답변 결과 조회
</div>`,
  /* 관리자 메뉴 */
  admin01: `<h3>관리자메뉴1</h3>
  `,
  admin02: `<h3>관리자메뉴2</h3>
  `,
  admin03: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>공통코드 관리<strong></h3>
  <div class="form-group">
  <select class="form-select form-control m-2" id="sch-comcode">
  </select>
  <button class='btn btn-primary' id='btn-search-question' onClick='searchCommCode()'>조회</button>
  <button class='btn btn-danger' id='btn-delete-question' onClick='deleteCommCode()'>삭제</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>문항 목록</h4>
    <div id='grid-question-list'></div>
  </div>
</div>
  `,
};

const getDateString = function (dateObj) {
  let monthStr = "";
  let dateStr = "";
  if (dateObj.getMonth() + 1 < 10) {
    monthStr += "0" + (dateObj.getMonth() + 1);
  } else {
    monthStr += dateObj.getMonth();
  }

  if (dateObj.getDate() < 10) {
    dateStr += "0" + dateObj.getDate();
  } else {
    dateStr += dateObj.getDate();
  }

  return dateObj.getFullYear() + "-" + monthStr + "-" + dateStr;
};

//1. functions
const changeMenu = function (menuId) {
  if (global_Menu[menuId] === null) {
    alert("메뉴 정보가 없습니다.");
    return;
  }
  $("#admin-menu-area").html(global_Menu[menuId]);
  //after menu load..
  if (menuId === "a01") {
    //설문 등록하기 입력값 세팅
    let dt = new Date();
    $("#inpSTART_TIME").val(getDateString(dt));
    dt.setDate(dt.getDate() + 7);
    $("#inpEND_TIME").val(getDateString(dt));

    searchUser();
    //sel-comp-id
    $.ajax({
      type: "GET",
      url: "/searchCompany",
      data: {},
      success: function (data) {
        console.log("회사 목록 조회 완료!");
        console.log(data);
        let companyListStr = "";
        for (let i = 0; i < data.length; ++i) {
          companyListStr +=
            "<option value='" +
            data[i]["company_id"] +
            "'>" +
            data[i]["company_name"] +
            "</option>";
        }
        $("#sel-comp-id").html(companyListStr);
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
    //sel-regist-srvy-id
    $.ajax({
      type: "GET",
      url: "/searchSurvey",
      data: {},
      success: function (data) {
        console.log("설문 목록 조회 완료!");
        console.log(data);
        let surveyListStr = "";
        for (let i = 0; i < data.length; ++i) {
          surveyListStr +=
            "<option value='" +
            data[i]["srvy_id"] +
            "'>" +
            data[i]["srvy_titl"] +
            "</option>";
        }
        $("#sel-regist-srvy-id").html(surveyListStr);
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  } else if (menuId === "a02") {
    searchCompany();
  } else if (menuId === "b01") {
    searchSurvey();
  } else if (menuId === "b02") {
    //문항관리
    $.ajax({
      type: "GET",
      url: "/searchSurvey",
      data: {},
      success: function (data) {
        console.log("설문 목록 조회 완료!");
        console.log(data);
        let surveyListStr = "";
        for (let i = 0; i < data.length; ++i) {
          surveyListStr +=
            "<option value='" +
            data[i]["srvy_id"] +
            "'>" +
            data[i]["srvy_titl"] +
            "</option>";
        }
        $("#sel-srvy-id").html(surveyListStr);
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
      },
    });
  } else if (menuId === "c01") {
  } else if (menuId === "c02") {
  }
};

//2. request functions
/****************************************************************************************************
 * USER FUNCTIONS(A01)
 *****************************************************************************************************/
const searchUser = function () {
  $.ajax({
    type: "GET",
    url: "/searchUser",
    data: {},
    success: function (data) {
      console.log("사용자 목록 조회 완료!");
      global_user_list = data;
      console.log(global_user_list);

      if (data.length < 1) {
        $("#grid-user-list").html("조회 결과가 없습니다.");
      } else {
        $("#grid-user-list").html("");
        const grid = new tui.Grid({
          rowHeaders: [
            {
              type: "rowNum",
              width: 100,
              align: "left",
              valign: "bottom",
            },
            {
              type: "checkbox",
            },
          ],
          el: document.getElementById("grid-user-list"),
          data: data,
          scrollX: false,
          scrollY: false,
          columns: arrColumnsA01,
        });
        grid.on("check", (e) => {
          selected_user_list.push(global_user_list[e.rowKey]["user_id"]);
          console.log(selected_user_list);
        });
        grid.on("uncheck", (e) => {
          for (let i = 0; i < selected_user_list.length; ++i) {
            if (
              selected_user_list[i] === global_user_list[e.rowKey]["user_id"]
            ) {
              selected_user_list.splice(i, 1);
            }
          }
          console.log(selected_user_list);
        });
      }
      selected_user_list = [];
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//사용자를 추가한다.
const addUser = function () {
  //조회 전 입력값 체크
  const COMP_NAME = $("#sel-comp-id").val();
  const DEPT_NAME = $("#inp-dept-name").val();
  const USER_ID = $("#inp-user-id").val();
  const USER_NAME = $("#inp-user-name").val();
  const USER_PW = $("#inp-user-pw").val();
  const USER_EMAIL = $("#inp-user-email").val();
  const USER_DIV = $("#inp-user-div").val();

  if (comNullCheck(COMP_NAME)) {
    comMessage("NULLCHECK", "소속");
    $("#sel-comp-id").focus();
    return;
  }
  if (comNullCheck(DEPT_NAME)) {
    comMessage("NULLCHECK", "부서");
    $("#inp-dept-name").focus();
    return;
  }
  if (comNullCheck(USER_ID)) {
    comMessage("NULLCHECK", "ID");
    $("#inp-user-id").focus();
    return;
  }
  if (comNullCheck(USER_NAME)) {
    comMessage("NULLCHECK", "성명");
    $("#inp-user-name").focus();
    return;
  }
  if (comNullCheck(USER_PW)) {
    comMessage("NULLCHECK", "비밀번호");
    $("#inp-user-pw").focus();
    return;
  }
  if (comNullCheck(USER_DIV) || USER_DIV.length != 1) {
    comMessage("NULLCHECK", "사용자 구분");
    $("#inp-user-div").focus();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/addUser",
    data: {
      COMP_NAME: COMP_NAME,
      DEPT_NAME: DEPT_NAME,
      USER_ID: USER_ID,
      USER_NAME: USER_NAME,
      USER_PW: USER_PW,
      USER_EMAIL: USER_EMAIL,
      USER_DIV: USER_DIV,
    },
    success: function (data) {
      alert("사용자가 추가되었습니다.");
      console.log(data);
      $("#btn-add-modal-close").click();
      searchUser();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//사용자를 삭제한다.
const deleteUser = function () {
  if (selected_user_list.length < 1) {
    alert("선택한 사용자가 없습니다.");
    return;
  }
  $.ajax({
    type: "DELETE",
    url: "/deleteUser",
    data: {
      user_list: selected_user_list,
    },
    success: function (data) {
      alert("사용자가 삭제되었습니다.");
      console.log(data);
      searchUser();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const clearUserInput = function () {
  $("#sel-comp-id").eq(0).prop("selected", true);
  $("#inp-dept-name").val("");
  $("#inp-user-id").val("");
  $("#inp-user-name").val("");
  $("#inp-user-pw").val("");
  $("#inp-user-email").val("");
  $("#inp-user-div option").eq(0).prop("selected", true);
};

//사용자에게 설문 등록하기
const registSurvey = function () {
  console.log(typeof $("#inpSTART_TIME").val());
  console.log($("#inpSTART_TIME").val());
  console.log($("#inpEND_TIME").val());
  //조회 전 입력값 체크
  const START_TIME = $("#inpSTART_TIME").val();
  const END_TIME = $("#inpEND_TIME").val();

  if (comNullCheck(START_TIME)) {
    comMessage("NULLCHECK", "설문시작시간");
    $("#inpSTART_TIME").focus();
    return;
  }
  if (comNullCheck(END_TIME)) {
    comMessage("NULLCHECK", "설문종료시간");
    $("#inpEND_TIME").focus();
    return;
  }
  if (START_TIME > END_TIME) {
    alert("종료시간이 시작시간보다 먼저 올 수 없습니다.");
    return;
  }

  if (selected_user_list.length < 1) {
    alert("선택한 사용자가 없습니다.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/registSurvey",
    data: {
      user_list: selected_user_list,
      SRVY_ID: $("#sel-regist-srvy-id").val(),
      START_TIME: START_TIME,
      END_TIME: END_TIME,
    },
    success: function (data) {
      if (data.errcode == 0) {
        alert("사용자에 대한 설문이 등록되었습니다.");
      } else {
        alert(data.msg);
      }
      console.log(data);
      searchUser();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

/****************************************************************************************************
 * COMPANY FUNCTIONS(A02)
 *****************************************************************************************************/
const searchCompany = function () {
  $.ajax({
    type: "GET",
    url: "/searchCompany",
    data: {},
    success: function (data) {
      console.log("회사 목록 조회 완료!");
      global_company_list = data;
      console.log(global_company_list);

      if (data.length < 1) {
        $("#grid-company-list").html("조회 결과가 없습니다.");
      } else {
        $("#grid-company-list").html("");
        const grid = new tui.Grid({
          rowHeaders: [
            {
              type: "rowNum",
              width: 100,
              align: "left",
              valign: "bottom",
            },
            {
              type: "checkbox",
            },
          ],
          el: document.getElementById("grid-company-list"),
          data: data,
          scrollX: false,
          scrollY: false,
          columns: arrColumnsA02,
        });
        grid.on("check", (e) => {
          selected_company_list.push(
            global_company_list[e.rowKey]["company_id"]
          );
          console.log(selected_company_list);
        });
        grid.on("uncheck", (e) => {
          for (let i = 0; i < selected_company_list.length; ++i) {
            if (
              selected_company_list[i] ===
              global_company_list[e.rowKey]["company_id"]
            ) {
              selected_company_list.splice(i, 1);
            }
          }
          console.log(selected_company_list);
        });
      }
      selected_company_list = [];
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const addCompany = function () {
  //조회 전 입력값 체크
  const COMPANY_ID = $("#inpCOMPANY_ID").val();
  const COMPANY_NAME = $("#inpCOMPANY_NAME").val();
  const COMPANY_NAME1 = $("#inpCOMPANY_NAME1").val();
  const DTL_NOTE = $("#inpDTL_NOTE").val();

  if (comNullCheck(COMPANY_ID)) {
    comMessage("NULLCHECK", "회사ID");
    $("#inpCOMPANY_ID").focus();
    return;
  }
  if (comNullCheck(COMPANY_NAME)) {
    comMessage("NULLCHECK", "회사명");
    $("#inpCOMPANY_NAME").focus();
    return;
  }
  if (comNullCheck(COMPANY_NAME1)) {
    comMessage("NULLCHECK", "회사명1");
    $("#inpCOMPANY_NAME1").focus();
    return;
  }
  if (comNullCheck(DTL_NOTE)) {
    comMessage("NULLCHECK", "비고");
    $("#inpDTL_NOTE").focus();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/addCompany",
    data: {
      COMPANY_ID: COMPANY_ID,
      COMPANY_NAME: COMPANY_NAME,
      COMPANY_NAME1: COMPANY_NAME1,
      DTL_NOTE: DTL_NOTE,
    },
    success: function (data) {
      alert("회사가 추가되었습니다.");
      console.log(data);
      $("#btn-add-modal-close").click();
      searchCompany();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const deleteCompany = function () {
  if (selected_company_list.length < 1) {
    alert("선택한 회사가 없습니다.");
    return;
  }
  $.ajax({
    type: "DELETE",
    url: "/deleteCompany",
    data: {
      company_list: selected_company_list,
    },
    success: function (data) {
      alert("회사가 삭제되었습니다.");
      console.log(data);
      searchCompany();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//clear company modal inputs
const clearCompanyInput = function () {
  $("#inpCOMPANY_ID").val("");
  $("#inpCOMPANY_NAME").val("");
  $("#inpCOMPANY_NAME1").val("");
  $("#inpDTL_NOTE").val("");
};

/****************************************************************************************************
 * SURVEY FUNCTIONS(B01)
 *****************************************************************************************************/
const searchSurvey = function () {
  $.ajax({
    type: "GET",
    url: "/searchSurvey",
    data: {},
    success: function (data) {
      console.log("설문 목록 조회 완료!");
      global_survey_list = data;
      console.log(global_survey_list);

      if (data.length < 1) {
        $("#grid-survey-list").html("조회 결과가 없습니다.");
      } else {
        $("#grid-survey-list").html("");
        const grid = new tui.Grid({
          rowHeaders: [
            {
              type: "rowNum",
              width: 100,
              align: "left",
              valign: "bottom",
            },
            {
              type: "checkbox",
            },
          ],
          el: document.getElementById("grid-survey-list"),
          data: data,
          scrollX: false,
          scrollY: false,
          columns: arrColumnsB01,
        });
        grid.on("check", (e) => {
          selected_survey_list.push(global_survey_list[e.rowKey]["srvy_id"]);
          console.log(selected_survey_list);
        });
        grid.on("uncheck", (e) => {
          for (let i = 0; i < selected_survey_list.length; ++i) {
            if (
              selected_survey_list[i] ===
              global_survey_list[e.rowKey]["srvy_id"]
            ) {
              selected_survey_list.splice(i, 1);
            }
          }
          console.log(selected_survey_list);
        });
      }
      selected_survey_list = [];
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const addSurvey = function () {
  //조회 전 입력값 체크
  const SRVY_TITL = $("#inpSRVY_TITL").val();
  const DTL_NOTE = $("#inpDTL_NOTE_B01").val();

  if (comNullCheck(SRVY_TITL)) {
    comMessage("NULLCHECK", "설문제목");
    $("#inpSRVY_TITL").focus();
    return;
  }

  if (comNullCheck(DTL_NOTE)) {
    comMessage("NULLCHECK", "비고");
    $("#inpDTL_NOTE_B01").focus();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/addSurvey",
    data: {
      SRVY_TITL: SRVY_TITL,
      DTL_NOTE: DTL_NOTE,
    },
    success: function (data) {
      alert("설문이 추가되었습니다.");
      console.log(data);
      $("#btn-add-survey-modal-close").click();
      searchSurvey();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const deleteSurvey = function () {
  if (selected_survey_list.length < 1) {
    alert("선택한 설문이 없습니다.");
    return;
  }
  $.ajax({
    type: "DELETE",
    url: "/deleteSurvey",
    data: {
      survey_list: selected_survey_list,
    },
    success: function (data) {
      alert("설문이 삭제되었습니다.");
      console.log(data);
      searchSurvey();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//clear survey modal inputs
const clearSurveyInput = function () {
  $("#inpSRVY_TITL").val("");
  $("#inpDTL_NOTE").val("");
};

/****************************************************************************************************
 * QUESTION FUNCTIONS(B02)
 *****************************************************************************************************/
const searchQuestion = function () {
  $.ajax({
    type: "GET",
    url: "/searchQuestion",
    data: {
      srvy_id: $("#sel-srvy-id").val() /* 설문 ID */,
    },
    success: function (data) {
      console.log("질의 목록 조회 완료!");
      global_question_list = data;
      console.log(global_question_list);

      if (data.length < 1) {
        $("#grid-question-list").html("조회 결과가 없습니다.");
      } else {
        $("#grid-question-list").html("");
        const grid = new tui.Grid({
          rowHeaders: [
            /*
            {
              type: "rowNum",
              width: 100,
              align: "left",
              valign: "bottom",
            },*/
            {
              type: "checkbox",
            },
          ],
          el: document.getElementById("grid-question-list"),
          data: data,
          scrollX: false,
          scrollY: false,
          columns: arrColumnsB02,
        });
        grid.on("check", (e) => {
          selected_question_list.push(
            global_question_list[e.rowKey]["qstn_seq"]
          );
          console.log(selected_question_list);
        });
        grid.on("uncheck", (e) => {
          for (let i = 0; i < selected_question_list.length; ++i) {
            if (
              selected_question_list[i] ===
              global_question_list[e.rowKey]["qstn_seq"]
            ) {
              selected_question_list.splice(i, 1);
            }
          }
          console.log(selected_question_list);
        });
      }
      selected_question_list = [];
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const addQuestion = function () {
  //조회 전 입력값 체크
  const QSTN_TITL = $("#inpQSTN_TITL").val();
  const QSTN_OPTN_1 = $("#inpQSTN_OPTN_1").val();
  const QSTN_OPTN_2 = $("#inpQSTN_OPTN_2").val();
  const QSTN_OPTN_3 = $("#inpQSTN_OPTN_3").val();
  const QSTN_OPTN_4 = $("#inpQSTN_OPTN_4").val();
  const DTL_NOTE = $("#inpDTL_NOTE_B02").val();

  if (comNullCheck(QSTN_TITL)) {
    comMessage("NULLCHECK", "질의제목");
    $("#inpQSTN_TITL").focus();
    return;
  }

  if (comNullCheck(QSTN_OPTN_1)) {
    comMessage("NULLCHECK", "가중치(전혀 그렇지 않다)");
    $("#inpQSTN_OPTN_1").focus();
    return;
  }

  if (comNullCheck(QSTN_OPTN_2)) {
    comMessage("NULLCHECK", "가중치(약간 그렇지 않다)");
    $("#inpQSTN_OPTN_2").focus();
    return;
  }

  if (comNullCheck(QSTN_OPTN_3)) {
    comMessage("NULLCHECK", "가중치(약간 그렇다)");
    $("#inpQSTN_OPTN_3").focus();
    return;
  }

  if (comNullCheck(QSTN_OPTN_4)) {
    comMessage("NULLCHECK", "가중치(매우 그렇다)");
    $("#inpQSTN_OPTN_4").focus();
    return;
  }

  if (comNullCheck(DTL_NOTE)) {
    comMessage("NULLCHECK", "비고");
    $("#inpDTL_NOTE_B02").focus();
    return;
  }

  $.ajax({
    type: "POST",
    url: "/addQuestion",
    data: {
      SRVY_ID: $("#sel-srvy-id").val(),
      QSTN_TITL: QSTN_TITL,
      QSTN_OPTN_1: QSTN_OPTN_1,
      QSTN_OPTN_2: QSTN_OPTN_2,
      QSTN_OPTN_3: QSTN_OPTN_3,
      QSTN_OPTN_4: QSTN_OPTN_4,
      DTL_NOTE: DTL_NOTE,
    },
    success: function (data) {
      alert("설문에 질의가 추가되었습니다.");
      console.log(data);
      $("#btn-add-question-modal-close").click();
      searchQuestion();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const deleteQuestion = function () {
  if (selected_question_list.length < 1) {
    alert("선택한 질의가 없습니다.");
    return;
  }
  $.ajax({
    type: "DELETE",
    url: "/deleteQuestion",
    data: {
      SRVY_ID: $("#sel-srvy-id").val(),
      question_list: selected_question_list,
    },
    success: function (data) {
      alert("질의가 삭제되었습니다.");
      console.log(data);
      searchQuestion();
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//clear survey modal inputs
const clearQuestionInput = function () {
  $("#inpQSTN_TITL").val("");
  $("#inpQSTN_OPTN_1").val("");
  $("#inpQSTN_OPTN_2").val("");
  $("#inpQSTN_OPTN_3").val("");
  $("#inpQSTN_OPTN_4").val("");
  $("#inpDTL_NOTE_B02").val("");
};

//3. add event
changeMenu("a01");
