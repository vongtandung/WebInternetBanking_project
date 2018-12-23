import React, { Component } from "react";
import "./UserSend.css";
import moneySendIco from "../../../../assets/images/ico/send-money-ico.png";
import label from "../../../../assets/images/pic/label.png";

class UserSend extends Component {
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
      <div className="user-send-money">
        <div className="user-send-header">
          <h1>CHUYỂN KHOẢN NỘI BỘ</h1>
          <div className="send-money-ico">
            <img src={moneySendIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-send-body">
          <form>
            <div className="user-send-info">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Thông tin người chuyển</p>
                </div>
              </div>
              <div class="form-group form-user-inf">
                <div className="form-block">
                  <label
                    for="accList"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tài khoản nguồn
                  </label>
                  <div className="col-form-input-custom">
                    <select id="accList" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accAmount"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Số dư khả dụng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg col-form-input-readonly">
                     123132132 &#8363;
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserSend;
