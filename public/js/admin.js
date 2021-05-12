const global_Menu = {
  a01: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>사용자 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-user' onClick='searchUser()'>조회</button>
  <button class='btn btn-primary' id='btn-add-user' data-toggle="modal" data-target="#addUserModal">추가</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>사용자 목록</h4>
    <div id='grid-user-list'></div>
  </div>
</div>`,
  b01: `<div class="mt-5 p-4 card shadow login-wrapper">
  <img src="/img/Changjo_LOG.jpg" class="login-logo mt-5" />
  <h3 class="text-center mt-3">직무스트레스 평가시스템</h3>
  문항관리
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
//1. functions
const changeMenu = function (menuId) {
  if (global_Menu[menuId] === null) {
    alert("메뉴 정보가 없습니다.");
    return;
  }
  $("#admin-menu-area").html(global_Menu[menuId]);
};

//2. request functions
const searchUser = function () {
  $.ajax({
    type: "GET",
    url: "/searchUser",
    data: {},
    success: function (data) {
      console.log("사용자 목록 조회 완료!");
      console.log(data);

      if (data.length < 1) {
        $("#grid-user-list").html("조회 결과가 없습니다.");
      } else {
        $("#grid-user-list").html("");
        createGrid("grid-user-list", data, arrColumnsA01);
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    },
  });
};

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
    return;
  }
  if (comNullCheck(DEPT_NAME)) {
    comMessage("NULLCHECK", "부서");
    return;
  }
  if (comNullCheck(USER_ID)) {
    comMessage("NULLCHECK", "ID");
    return;
  }
  if (comNullCheck(USER_NAME)) {
    comMessage("NULLCHECK", "성명");
    return;
  }
  if (comNullCheck(USER_PW)) {
    comMessage("NULLCHECK", "비밀번호");
    return;
  }
  if (comNullCheck(USER_DIV) || USER_DIV.length != 1) {
    comMessage("NULLCHECK", "사용자 구분");
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

//3. add event
changeMenu("a01");
