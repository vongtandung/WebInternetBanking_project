import React, { Component } from "react";
import "./ManageAcc.css";
import { connect } from "react-redux";
import CurrencyInput from "react-currency-input";
import * as actions from "../../../actions";
import WebService from "../../../utilities/WebServices";

class ManageAcc extends Component {
  constructor() {
    super();
    this.state = {
      focusPhone: "",
      focusAccPay: "",
      userExits: false,
      accMoneyRecharge: null
    };
    this.webService = new WebService();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.userPhone !== this.props.userPhone ||
      nextProps.userAccPay !== this.props.userAccPay
    ) {
      if (nextProps.userPhone.return_code === -1) {
        this.props.showPopup(nextProps.userPhone.return_mess, "", "error");
      }
      if (
        nextProps.userPhone.error === true ||
        nextProps.userAccPay.error === true
      ) {
        this.props.showPopup("Phiên của bạn đã hết hạn", "", "error");
        this.webService.logout();
        this.props.history.push("/login");
      }
    }
  }
  handleCreateAccPayApi = userId => {
    this.webService
      .createAccPay(userId)
      .then(res => {
        if (res.return_code === 1) {
          this.props.showPopup(
            "Tạo tài khoản thanh toán thành công",
            "",
            "success"
          );
          this.refs.accPhone.value = "";
          this.refs.accName.value = "";
          this.refs.accEmail.value = "";
        } else if (res.return_code === -1) {
          this.props.showPopup("Tạo không thành công", "", "error");
        }
      })
      .catch(error => {
        if (error === 401) {
          this.webService
            .renewToken()
            .then(res => {
              this.webService.updateToken(res.access_token);
              this.handleCreateAccPayApi(userId);
            })
            .catch(error => {
              this.webService.logout();
              this.props.history.push("/login");
            });
        } else if (error === 403) {
          this.webService.logout();
          this.props.push("/login");
          return;
        }
      });
  };
  handleRechargeMoneyApi = (accountNumber, plus) => {
    this.webService
      .rechargeAccpay(accountNumber, plus)
      .then(res => {
        if (res.return_code === 1) {
          this.props.showPopup(
            "Nạp tiền vào tài khoản thành công",
            "",
            "success"
          );
          this.setState({ accMoneyRecharge: null }, () => {
            this.refs.accPay.value = "";
            this.refs.accName1.value = "";
            this.refs.accEmail1.value = "";
            this.refs.accPhone1.value = "";
          });
        } else if (res.return_code === -1) {
          this.props.showPopup("Nạp tiền không thành công", "", "error");
        }
      })
      .catch(error => {
        if (error === 401) {
          this.webService
            .renewToken()
            .then(res => {
              this.webService.updateToken(res.access_token);
              this.handleRechargeMoneyApi(accountNumber, plus);
            })
            .catch(error => {
              this.webService.logout();
              this.props.history.push("/login");
            });
        } else if (error === 403) {
          this.webService.logout();
          this.props.push("/login");
          return;
        }
      });
  };
  handleChangePhone = e => {
    e.preventDefault();
    if (e.target.value.length > 0 && e.target.value.length <= 10) {
      this.setState({
        focusPhone: "Đang tìm kiếm"
      });
      this.props.fetchUserByPhoneData(e.target.value);
    } else if (e.target.value.length === 0) {
      this.setState({
        focusPhone: ""
      });
    }
  };
  handleChangeAccPay = e => {
    e.preventDefault();
    if (e.target.value.length > 0 && e.target.value.length <= 17) {
      this.setState({
        focusAccPay: "Đang tìm kiếm"
      });
      this.props.fetchUserByAccPayData(e.target.value);
    } else if (e.target.value.length === 0) {
      this.setState({
        focusAccPay: ""
      });
    }
  };
  handleChangeMoneySend = (e, maskedvalue, floatvalue) => {
    e.preventDefault();
    this.setState({ accMoneyRecharge: floatvalue });
  };
  handleCreateAccPaySubmit = e => {
    e.preventDefault();
    if (this.props.userPhone.data) {
      this.handleCreateAccPayApi(this.props.userPhone.data[0].id);
    } else {
      this.props.showPopup("Không tìm thấy tài khoản tương ứng", "", "error");
    }
  };
  handleRechargeAccPaySubmit = e => {
    e.preventDefault();
    if (!this.props.userAccPay.data1) {
      this.props.showPopup("Không tìm thấy tài khoản tương ứng", "", "error");
    } else if (
      this.state.accMoneyRecharge == null ||
      this.state.accMoneyRecharge < 50000
    ) {
      this.props.showPopup("Số tiền nạp tối thiểu là 50.000 đồng", "", "error");
    } else if (this.props.userAccPay.data1) {
      this.handleRechargeMoneyApi(
        e.target.accPay.value,
        this.state.accMoneyRecharge
      );
    }
  };
  render() {
    const { data } = this.props.userPhone;
    const { data1 } = this.props.userAccPay;
    const accMoneyRecharge = this.state.accMoneyRecharge;
    const focusPhone = this.state.focusPhone;
    const focusAccPay = this.state.focusAccPay;
    return (
      <div className="staff-manage-acc">
        <ul className="nav nav-tabs navbar-manage" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              <h5>Tạo tài khoản thanh toán</h5>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              <h5>Nạp tiền vào tài khoản</h5>
            </a>
          </li>
        </ul>
        <div className="tab-content tab-content-manage" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form
              onSubmit={this.handleCreateAccPaySubmit}
              className="staff-manage-accpay"
            >
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
                      autoComplete={"off"}
                      onChange={this.handleChangePhone}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accName"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Họ tên
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accName"
                      type="text"
                      className="form-control"
                      id="accName"
                      maxLength="10"
                      value={data ? data[0].name : focusPhone}
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
                      value={data ? data[0].email : focusPhone}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-acc">Tạo tài khoản</button>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <form
              onSubmit={this.handleRechargeAccPaySubmit}
              className="staff-manage-accpay"
            >
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accPay"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Số tài khoản
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accPay"
                      type="text"
                      className="form-control"
                      id="accPay"
                      placeholder="Nhập số tài khoản"
                      maxLength="17"
                      autoComplete={"off"}
                      onChange={this.handleChangeAccPay}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accName1"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Họ tên
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accName1"
                      type="text"
                      className="form-control"
                      id="accName1"
                      maxLength="10"
                      value={data1 ? data1[0].name : focusAccPay}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accEmail1"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Email
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accEmail1"
                      type="text"
                      className="form-control"
                      id="accEmail1"
                      maxLength="10"
                      value={data1 ? data1[0].email : focusAccPay}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accPhone1"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Số điện thoại
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      ref="accPhone1"
                      type="text"
                      className="form-control"
                      id="accPhone1"
                      maxLength="10"
                      value={data1 ? data1[0].phone : focusAccPay}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accMoneySend"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Số tiền
                  </label>
                  <div className="col-form-input-custom input-group">
                    <CurrencyInput
                      ref="accMoneySend"
                      className="form-control"
                      id="accMoneySend"
                      placeholder="Nhập số tiền"
                      aria-describedby="inputGroupPrepend"
                      precision="0"
                      value={accMoneyRecharge}
                      onChangeEvent={this.handleChangeMoneySend}
                    />
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="accMoneySend">
                        VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-acc">Nạp tiền</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPhone: state.userPhone,
  userAccPay: state.userAccPay
});

export default connect(
  mapStateToProps,
  actions
)(ManageAcc);
