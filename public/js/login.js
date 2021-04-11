//2. request functions
const login = function (id, password) {
  if (password.length < 1) {
    alert("비밀번호를 입력해 주세요.");
    return;
  } else {
    var form = document.getElementById("login-form");
    form.submit();
  }
};

//3. add event
$("#btn-login").click((e) => {
  login($("#inp-id").val(), $("#inp-password").val());
});

$("#inp-password").keydown((e) => {
  if (e.keyCode === 13) {
    login($("#inp-id").val(), $("#inp-password").val());
  }
});
