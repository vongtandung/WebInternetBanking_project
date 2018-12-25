import React, { Component } from "react";
import "./UserSend.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import WebService from "../../../../utilities/WebServices";
import SystemHelper from "../../../../utilities/System.helper";
import * as actions from "../../../../actions";
import moneySendIco from "../../../../assets/images/ico/send-money-ico.png";
import label from "../../../../assets/images/pic/label.png";

class UserSend extends Component {
  constructor() {
    super();
    this.state = {
      accPayList: [],
      accPaySel: null
    };
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }
  componentWillMount() {
    this.handleRoute(true);
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  componentDidMount() {
    this.haddleGetPayAccApi();
  }
  haddleGetPayAccApi = () => {
    const self = this;
    self.webService.getPaymentAcc().then(res => {
      if (res.return_code === 1) {
        self.setState({ accPayList: res.data });
      } else if (res.return_code === -1) {
        self.props.showPopup(res.return_mess, "", "error");
      }
    });
  };
  handleRoute = value => {
    this.props.isRoute(value);
  };
  handlekey = e => {};
  handleAccPaySel = (e) =>{
    this.setState({accPaySel: e.target.value})
  }
  render() {
    const accPayList = this.state.accPayList;
    const accPaySel = this.state.accPaySel;
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
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accList"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tài khoản nguồn
                  </label>
                  <div className="col-form-input-custom">
                    <select
                      ref="accPaySel"
                      id="accList"
                      className="form-control"
                      onChange={this.handleAccPaySel}
                    >
                      {accPayList.length > 0
                        ? accPayList.map((data, index) => {
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
                <div className="form-block">
                  <label
                    htmlFor="accAmount"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Số dư khả dụng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg">
                      {accPaySel}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-recive-info">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Thông tin người hưởng</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accRevList"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tìm kiếm
                  </label>
                  <div className="col-form-input-custom">
                    <select id="accRevList" className="form-control">
                      <option defaultValue>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accRevId"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Số tài khoản
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      className="form-control"
                      id="accRevId"
                      placeholder="Nhập số tài khoản"
                      onKeyUp={this.handlekey}
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accRevName"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tên người hưởng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      ref="nameRecive"
                      type="text"
                      className="form-control"
                      id="accRevName"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accRevSave"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Lưu người hưởng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="checkbox"
                      className="form-control"
                      id="accRevSave"
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accRevNameSave"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Nhập tên gợi nhớ
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      className="form-control"
                      id="accRevNameSave"
                    />
                  </div>
                </div>
              </div>
              <div className="user-send-trade">
                <div className="arrow-tag clearfix">
                  <img src={label} alt="tag-next" />
                  <div className="text">
                    <p>Thông tin giao dịch</p>
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
                      <input
                        type="text"
                        className="form-control"
                        id="accMoneySend"
                        placeholder="Nhập số tiền"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="accMoneySend">
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-block">
                    <label
                      htmlFor="accInfoSend"
                      className="col-form-label col-form-label-lg col-form-label-custom"
                    >
                      Nội dung chuyển
                    </label>
                    <div className="col-form-input-custom col-form-input-readonly">
                      <input
                        type="text"
                        className="form-control"
                        id="accInfoSend"
                        placeholder="Nhập nội dung"
                      />
                    </div>
                  </div>
                  <div className="form-block">
                    <label
                      htmlFor="accFeeSend"
                      className="col-form-label col-form-label-lg col-form-label-custom"
                    >
                      Phí chuyển tiền
                    </label>
                    <div className="col-form-input-custom col-form-input-readonly">
                      <select id="accFeeSend" className="form-control">
                        <option defaultValue>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-send-footer">
              <button type="submit" className="btn btn-transfer">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(UserSend)
);
