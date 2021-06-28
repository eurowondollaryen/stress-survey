//조회 시 채워지는 user index
let global_user_list;
//체크박스 체크된 user list
let selected_user_list = [];

let global_company_list;
let selected_company_list = [];

let global_survey_list;
let selected_survey_list = [];

const global_Menu = {
  a01: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>사용자 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-user' onClick='searchUser()'>조회</button>
  <button class='btn btn-success' id='btn-add-user' data-toggle="modal" data-target="#addUserModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-user' onClick='deleteUser()'>삭제</button>
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
  <div>
  <button class='btn btn-primary' id='btn-search-question' onClick='searchQuestion()'>조회</button>
  <button class='btn btn-success' id='btn-add-question' data-toggle="modal" data-target="#addQuestionModal">추가</button>
  <button class='btn btn-danger' id='btn-delete-question' onClick='deleteQuestion()'>삭제</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>문항 목록</h4>
    <div id='grid-question-list'></div>
  </div>
</div>`,
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
};
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

//1. functions
const changeMenu = function (menuId) {
  if (global_Menu[menuId] === null) {
    alert("메뉴 정보가 없습니다.");
    return;
  }
  $("#admin-menu-area").html(global_Menu[menuId]);
};

//2. request functions
/****************************************************************************************************
 * USER FUNCTIONS
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
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

//사용자를 추가한다.
const addUser = function () {
  //조회 전 입력값 체크
  const COMP_NAME = $("#inp-comp-name").val();
  const DEPT_NAME = $("#inp-dept-name").val();
  const USER_ID = $("#inp-user-id").val();
  const USER_NAME = $("#inp-user-name").val();
  const USER_PW = $("#inp-user-pw").val();
  const USER_EMAIL = $("#inp-user-email").val();
  const USER_DIV = $("#inp-user-div").val();

  if (comNullCheck(COMP_NAME)) {
    comMessage("NULLCHECK", "소속");
    $("#inp-comp-name").focus();
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
  $("#inp-comp-name").val("");
  $("#inp-dept-name").val("");
  $("#inp-user-id").val("");
  $("#inp-user-name").val("");
  $("#inp-user-pw").val("");
  $("#inp-user-email").val("");
  $("#inp-user-div option").eq(0).prop("selected", true);
};

/****************************************************************************************************
 * COMPANY FUNCTIONS
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
 * SURVEY FUNCTIONS
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
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

const addSurvey = function () {
  //조회 전 입력값 체크
  const SRVY_TITL = $("#inpSRVY_TITL").val();
  const DTL_NOTE = $("#inpDTL_NOTE").val();

  if (comNullCheck(SRVY_TITL)) {
    comMessage("NULLCHECK", "회사명");
    $("#inpSRVY_TITL").focus();
    return;
  }

  if (comNullCheck(DTL_NOTE)) {
    comMessage("NULLCHECK", "비고");
    $("#inpDTL_NOTE").focus();
    return;
  } 

  $.ajax({
    type: "POST",
    url: "/addSurvey",
    data: {
      SRVY_TITL: SRVY_TITL,
      DTL_NOTE: DTL_NOTE
    },
    success: function (data) {
      alert("설문이 추가되었습니다.");
      console.log(data);
      $("#btn-add-modal-close").click();
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

//3. add event
changeMenu("a01");
