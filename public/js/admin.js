const global_Menu = {
  a01: `<div class="mt-5 p-4 card shadow container">
  <h3><strong>사용자 관리<strong></h3>
  <div>
  <button class='btn btn-primary' id='btn-search-user' onClick='searchUser()'>조회</button>
  <button class='btn btn-primary' id='btn-add-user' onClick='popupAddUser()'>추가</button>
  </div>
  <div class='table-wrapper mt-5'>
    <h4>사용자 목록</h4>
    <table class='table table-striped table-bordered table-sm'>
      <thead>
        <tr class="text-center">
          <th scope="col">소속</th>
          <th scope="col">부서</th>
          <th scope="col">ID</th>
          <th scope="col">성명</th>
          <th scope="col">사용자구분</th>
          <th scope="col">최종수정시간</th>
        </tr>
      </thead>
      <tbody id='tbody-user-list'>
      </tbody>
    </table>
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
//1. functions
const changeMenu = function (menuId) {
  if (global_Menu[menuId] === null) {
    alert("메뉴 정보가 없습니다.");
    return;
  }
  $("#admin-menu-area").html(global_Menu[menuId]);
};

//2. request functions
const searchUser = function() {
  $.ajax({
    type: "GET",
    url: "/searchUser",
    data: {

    },
    success: function(data) {
      console.log("사용자 목록 조회 완료!");
      console.log(data);
      $("#tbody-user-list").html(jsonArrayToTable(data, ["comp_name", "dept_name", "user_id", "user_name", "user_div", "updt_time"]));
    },
    error: function(xhr, textStatus, errorThrown) {
        alert("request failed.\n" + xhr.status + " " + xhr.statusText);
    }
    
  });
};

const popupAddUser = function() {

};

//3. add event
changeMenu("a01");
