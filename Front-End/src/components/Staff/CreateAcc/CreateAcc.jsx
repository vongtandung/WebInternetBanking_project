import React, { Component } from "react";
import "./CreateAcc.css";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SystemHelper from "../../../utilities/System.helper";
import WebService from "../../../utilities/WebServices";


class CreateAcc extends Component {
  constructor() {
    super();
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }
  handleRegisterAccApi = (userName, passWord, name, email, phone) => {
    this.webService.createAcc(
      userName,
      passWord,
      name,
      email,
      phone
    ).then(res => {
      if (res.return_code === 1) {
        this.props.showPopup("Tạo tài khoản thành công", "", "success");
      } else if (res.return_code === -1) {
        this.props.showPopup("Tạo tài khoản thất bại", "", "error");
      }
    }).catch((error) => {
      if (error === 401) {
        this.webService.renewToken()
          .then(res => {
            this.webService.updateToken(res.access_token)
            this.handleRegisterAccApi(userName, passWord, name, email, phone)
          }).catch((error) => {
            this.webService.logout();
            this.props.history.push('/login')
          })
      } else if (error === 403) {
        this.webService.logout()
        this.props.push('/login')
        return
      }
    });
  }
  handleRegisterFormSubmit = e => {
    e.preventDefault();
    const validate = this.helper.validateRegister(
      e.target.inputuserName.value,
      e.target.inputPassword.value,
      e.target.inputRePassword.value,
      e.target.inputName.value,
      e.target.inputEmail.value,
      e.target.inputPhone.value
    );
    if (validate.isValid === false) {
      this.props.showPopup(validate.mess, "", "error");
    } else {
      this.handleRegisterAccApi(
        e.target.inputuserName.value,
        e.target.inputPassword.value,
        e.target.inputName.value,
        e.target.inputEmail.value,
        e.target.inputPhone.value
      );
    }
  }
  render() {
    return (
      <div className="staff-create-acc">
        <div className="staff-create-header">
          <h2>Tạo tài khoản khách hàng</h2>
        </div>
        <div className="staff-create-body">
          <form id="registerForm" onSubmit={this.handleRegisterFormSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputuserName">Tên tài khoản (*)</label>
                <input type="text" className="form-control" id="inputuserName" placeholder="Nhập tên tài khoản" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputName">Họ tên khách hàng (*)</label>
                <input type="text" className="form-control" id="inputName" placeholder="Nhập họ tên khách hàng" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword">Password (*)</label>
                <input type="password" className="form-control" id="inputPassword" placeholder="Nhập password" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputRePassword">Re-Password (*)</label>
                <input type="password" className="form-control" id="inputRePassword" placeholder="Nhập lại password" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail">Email (*)</label>
                <input type="email" className="form-control" id="inputEmail" placeholder="Nhập Email" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Số điện thoại (*)</label>
                <input maxLength="10" type="text" className="form-control" id="inputPhone" placeholder="Nhập số điện thoại" />
              </div>
            </div>
          </form>
        </div>
        <div className="staff-create-footer">
          <input type="submit" form="registerForm" className="btn btn-acc" value="Đăng kí" />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(CreateAcc);
