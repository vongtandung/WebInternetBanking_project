import React, { Component } from "react";
import "./UserAcc.css";
import accContactIco from "../../../../assets/images/ico/acc-contact-ico.png";
import label from "../../../../assets/images/pic/label.png";
import WebService from "../../../../utilities/WebServices";

class UserAcc extends Component {
  constructor(){
    super();
    this.webService = new WebService();
  }
  componentWillMount() {
    this.handleRoute(true);
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  handleRoute = value => {
    this.props.isRoute(value);
  };
  render() {
    return (
      <div className="user-acc-close">
        <div className="user-acc-header">
          <h1>QUẢN LÝ TÀI KHOẢN</h1>
          <div className="send-money-ico">
            <img src={accContactIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-acc-body">
          <form>
            <div className="user-acc-create">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Đóng tài khoản</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <p className="warning">
                  *Chọn một tài khoản thanh toán cần đóng
                </p>
                <div className="form-block">
                  <label
                    htmlFor="accCloseId"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Chọn tài khoản
                  </label>
                  <div className="col-form-input-custom">
                    <select id="accCloseId" className="form-control">
                      <option defaultValue>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div className="user-history-footer">
                  <button type="submit" className="btn btn-acc">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserAcc;
