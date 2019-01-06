import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WebService from "../../../utilities/WebServices";
import SystemHelper from "../../../utilities/System.helper";
import * as actions from "../../../actions";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../../../assets/images/pic/bank-logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      recapValue: ""
    };
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }
  componentWillMount() {
    if (this.webService.isUser()) {
      this.props.history.push("/user");
    } else if (this.webService.isAdmin()) {
      this.props.history.push("/staff");
    } else {
      this.props.isLogged(true);
    }
  }
  handleFormRecapcha = value => {
    this.setState({ recapValue: value });
  };
  handleFormExpRecapcha = () => {
    this.setState({ recapValue: "" });
  };
  handleFormLoginSubmit = e => {
    e.preventDefault();
    const validate = this.helper.validateLogin(
      e.target.username.value,
      e.target.password.value,
      this.state.recapValue
    );
    if (validate.isValid === false) {
      this.props.showPopup(validate.mess, "", "error");
    } else {
      this.webService
        .login(e.target.username.value, e.target.password.value)
        .then(res => {
          if (res && res.auth === false) {
            this.props.showPopup("Tài khoản hoặc mật khẩu chưa đúng", "", "error");
          } else {
            const data = res.data;
            if (res.return_code === 1) {
              this.webService.setInfo(
                data.id,
                data.name,
                data.email,
                data.userName,
                data.phone,
                data.permission,
                data.access_token,
                data.refresh_token
              );
              if (this.webService.isUser()) {
                this.props.history.push("/user");
              }
              if (this.webService.isAdmin()) {
                this.props.history.push("/staff");
              }
            } else if (res.return_code === -1) {
              this.props.showPopup(res.return_mess, "", "error");
            }
          }
        });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="login-form wrapper fadeInDown">
          <div id="formContentLogin">
            <div className="form-title">
              <h2 className="active"> Đăng nhập vào hệ thống SmartBank </h2>
            </div>
            <div className="fadeIn first">
              <img src={logo} id="icon-login" alt="User Icon" />
            </div>
            <form onSubmit={this.handleFormLoginSubmit}>
              <input
                type="text"
                id="username"
                className="fadeIn second"
                name="login"
                placeholder="Tài khoản"
              />
              <input
                type="text"
                id="password"
                className="fadeIn third pass"
                name="login"
                placeholder="Mật khẩu"
                autoComplete="off"
              />
              <ReCAPTCHA
                className="recapcha"
                theme="dark"
                sitekey="6LcyUYQUAAAAADF-XWVPY76cty0vNK7kx_fkEobL"
                onChange={this.handleFormRecapcha}
                onExpired={this.handleFormExpRecapcha}
              />
              <input
                type="submit"
                className="fadeIn fourth"
                value="Đăng nhập"
              />
            </form>
            <div id="formFooter" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(Login)
);
