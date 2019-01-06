import React, { Component } from 'react';
import "./ManageAcc.css";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import WebService from '../../../utilities/WebServices';

class ManageAcc extends Component {
  constructor() {
    super();
    this.state = {
      focus: "",
      userExits: false
    }
    this.webService = new WebService();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userPhone !== this.props.userPhone) {
      if (nextProps.userPhone.return_code === -1) {
        this.props.showPopup(nextProps.userPhone.return_mess, "", "error");
      }
      if (nextProps.userPhone.error === true) {
        this.props.showPopup("Phiên của bạn đã hết hạn", "", "error");
        this.webService.logout();
        this.props.history.push("/login");
      }
    }
  }
  handleCreateAccPayApi = userId => {
    this.webService.createAccPay(userId).then(res => {
      if (res.return_code === 1) {
        this.props.showPopup("Tạo tài khoản thanh toán thành công", "", "success");
        this.refs.accPhone.value = "";
        this.refs.accName.value = "";
        this.refs.accEmail.value = "";
      } else if (res.return_code === -1) {
        this.props.showPopup("Tạo không thành công", "", "error");
      }
    }).catch((error) => {
      if (error === 401) {
        this.webService.renewToken()
          .then(res => {
            this.webService.updateToken(res.access_token)
            this.createAccPay(userId)
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
  handleChangePhone = e => {
    if (e.target.value.length > 0 && e.target.value.length <= 10) {
      this.setState({
        focus: "Đang tìm kiếm"
      });
    } else if (e.target.value.length === 0) {
      this.setState({
        focus: ""
      });
    }
    this.props.fetchUserByPhoneData(e.target.value)
  }
  handleCreateAccPaySubmit = (e) => {
    e.preventDefault();
    if (this.props.userPhone.data) {
      this.handleCreateAccPayApi(this.props.userPhone.data[0].id)
    } else {
      this.props.showPopup("Không tìm thấy tài khoản tương ứng", "", "error")
    }
  }
  render() {
    const { data } = this.props.userPhone;
    const focus = this.state.focus;
    return (
      <div className="staff-manage-acc">
        <ul className="nav nav-tabs navbar-manage" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tạo tài khoản thanh toán</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Nạp tiền vào tài khoản</a>
          </li>
        </ul>
        <div className="tab-content tab-content-manage" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <form onSubmit={this.handleCreateAccPaySubmit} className="staff-manage-accpay">
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accPhone"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Số điện thoại
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accPhone"
                      type="phone"
                      className="form-control"
                      id="accPhone"
                      placeholder="Nhập điện thoại"
                      maxLength="10"
                      onChange={this.handleChangePhone}
                      onBlur={this.handleBlurPhone}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accPhone"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Họ tên
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accName"
                      type="text"
                      className="form-control"
                      id="accPhone"
                      maxLength="10"
                      value={
                        data ? data[0].name : focus
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accEmail"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Email
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accEmail"
                      type="text"
                      className="form-control"
                      id="accEmail"
                      maxLength="10"
                      value={
                        data ? data[0].email : focus
                      }
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-acc">Tạo tài khoản</button>
            </form>
          </div>
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPhone: state.userPhone
});

export default connect(
  mapStateToProps,
  actions
)(ManageAcc);
