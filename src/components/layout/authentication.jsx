import React from 'react';

class Authentication extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            method="post"
            action="/auth"
          >
            <span className="login100-form-title p-b-26">로그인</span>
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font" />
            </span>
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is: a@b.c"
            >
              <input className="input100" type="text" name="email" />
              <span className="focus-input100" data-placeholder="Email" />
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye" />
              </span>
              <input className="input100" type="password" name="pass" />
              <span className="focus-input100" data-placeholder="Password" />
            </div>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn" />
                <button type="submit" className="login100-form-btn">
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Authentication;
