import React, { Component } from "react";
import "./UserPaymentList.css";
import accPayListIco from "../../../../assets/images/ico/acc-paylist-ico.png";
import label from "../../../../assets/images/pic/label.png";

class UserPaymentList extends Component {
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
      <div className="user-acc-payment">
        <div className="user-accpay-header">
          <h1>DANH SÁCH TÀI KHOẢN</h1>
          <div className="send-money-ico">
            <img src={accPayListIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-accpay-body">
          <form>
            <div className="user-accpay-info">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Tài khoản nguồn</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accList"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Tài khoản nguồn
                  </label>
                  <div className="col-form-input-custom">
                    <select id="accList" className="form-control">
                      <option defaultValue>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-accpay-detail">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Thông tin tài khoản</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accPayName"
                    className="col-form-label col-form-label-lg col-form-label-custom col-form-label-accpay-custom"
                  >
                    Tên tài khoản
                  </label>
                  <div className="col-form-input-accpay-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg ">
                      Lê Võ Hoàng Duy
                    </label>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accPayId"
                    className="col-form-label col-form-label-lg col-form-label-custom col-form-label-accpay-custom"
                  >
                    Số tài khoản
                  </label>
                  <div className="col-form-input-accpay-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg">
                      0123123123
                    </label>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accPayTotal"
                    className="col-form-label col-form-label-lg col-form-label-custom col-form-label-accpay-custom"
                  >
                    Số dư hiện tại
                  </label>
                  <div className="col-form-input-accpay-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg ">
                      123132132 &#8363;
                    </label>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accPayActive"
                    className="col-form-label col-form-label-lg col-form-label-custom col-form-label-accpay-custom"
                  >
                    Số dư khả dụng
                  </label>
                  <div className="col-form-input-accpay-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg ">
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

export default UserPaymentList;
