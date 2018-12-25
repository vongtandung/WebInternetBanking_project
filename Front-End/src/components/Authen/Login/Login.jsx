import React, { Component } from "react";
import "./Login.css";
import SystemHelper from "../../../utilities/System.helper";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../../../assets/images/pic/bank-logo.png";

class Login extends Component {
  constructor() {
    super()
    this.state = {
      recapValue: ""
    }
    this.helper = new SystemHelper()
  }
  componentWillMount = () => {
    this.props.isLogged(true);
  };
  handleFormRecapcha = (value) =>{
    this.setState({recapValue: value});
  }
  handleFormExpRecapcha = () =>{
    this.setState({recapValue: ""});
  }
  handleFormLoginSubmit = (e) =>{
    e.preventDefault();
    const validate = this.helper.validateLogin(e.target.username.value, e.target.password.value, this.state.recapValue)
    if (validate.isValid === false){
    } else {

    }
  }

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
                theme = "dark"
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

export default Login;
