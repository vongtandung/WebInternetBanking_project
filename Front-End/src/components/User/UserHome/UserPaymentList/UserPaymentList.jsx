import React, { Component } from "react";
import "./UserPaymentList.css";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import WebService from "../../../../utilities/WebServices";
import accPayListIco from "../../../../assets/images/ico/acc-paylist-ico.png";
import label from "../../../../assets/images/pic/label.png";
import spinner from "../../../../assets/images/ico/spinner.svg";

class UserPaymentList extends Component {
  constructor() {
    super();
    this.state = {
      accPaySel: null
    };
    this.webService = new WebService();
  }
  componentWillMount() {
    this.handleRoute(true);
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  componentDidMount() {
    this.props.fetchUserAccData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userAcc !== this.props.userAcc) {
      if (nextProps.userAcc.return_code === 1) {
        this.setState({ accPaySel: nextProps.userAcc.data[0].balance });
      } else if (nextProps.userAcc.return_code === -1) {
        this.props.showPopup(nextProps.userAcc.return_mess, "", "error");
      }
      if (nextProps.userAcc.error === true) {
        this.props.showPopup("Phiên của bạn đã hết hạn", "", "error");
        this.webService.logout();
        this.props.history.push("/login");
      }
    }
  }
  handleRoute = value => {
    this.props.isRoute(value);
  };
  handleAccPaySelChange = e => {
    e.preventDefault();
    this.setState({ accPaySel: e.target.value });
  };

  render() {
    const { loading, data, return_code } = this.props.userAcc;
    const accPaySel = this.state.accPaySel;
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
                    Chọn tài khoản
                  </label>
                  <div className="col-form-input-custom">
                    <select
                      id="accList"
                      className="form-control"
                      onChange={this.handleAccPaySelChange}
                      defaultValue="Chọn số tài khoản của bạn"
                    >
                      {return_code === 1 && data && data.length > 0
                        ? data.map((data, index) => {
                            return (
                              <option key={index} value={data.balance}>
                                {data.accountNumber}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
                <div className="loading-spinner">
                  {loading === true && (
                    <img src={spinner} alt="" width="30px" height="30px" />
                  )}
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
                      {this.webService.getName()}
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
                      {accPaySel} &#8363;
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
                      {accPaySel} &#8363;
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

const mapStateToProps = state => ({
  userAcc: state.userAcc
});

export default connect(
  mapStateToProps,
  actions
)(UserPaymentList);
