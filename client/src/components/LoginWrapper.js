import React, { useState } from "react";
import "../css/login.css";
const LoginWrapper = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const keyEvent = (e) => {
    const keyCode = e.keyCode;
    if(keyCode === 13) {
      doLogin(e);
    }
  };
  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const id = userId;
      const pw = userPw;
      console.log(id);
      console.log(pw);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "id": id, "pw": pw }),
      });
      const responseData = await response.json();
      //console.log(responseData);
      if(responseData.message === "success") {
        alert("login success!");
      } else {
        alert("아이디 또는 비밀번호를 확인해 주십시오.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="mt-5 p-4 card shadow login-wrapper">
      <img
        src={process.env.PUBLIC_URL + "/Changjo_LOG.jpg"}
        className="login-logo mt-5"
      />
      <h3 className="text-center mt-3">직무스트레스 평가</h3>
      <form className="mt-4">
        <input
          type="text"
          placeholder="아이디"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="form-control mt-1"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
          onKeyDown={(e) => keyEvent(e)}
        />
      </form>
      <button className="btn btn-primary mt-3" onClick={doLogin}>
        로그인
      </button>
    </div>
  );
};

export default LoginWrapper;
