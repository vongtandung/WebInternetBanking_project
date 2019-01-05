import React, { Component } from "react";
import "./UserHistory.css";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WebService from "../../../utilities/WebServices";
import SystemHelper from "../../../utilities/System.helper";
import * as actions from "../../../actions";
import tradeHistory from "../../../assets/images/ico/history-trade-ico.png";
import label from "../../../assets/images/pic/label.png";
import spinner from "../../../assets/images/ico/spinner.svg";

class UserHistory extends Component {
  constructor() {
    super();
    this.state = {
      accPayList: [],
      accTransList: []
    };
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }
  componentWillMount(){
    this.props.setTitle("Lịch sử");
  }
  componentDidMount() {
    this.handleGetPayAccApi();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userHistory !== this.props.userHistory) {
      if (nextProps.userHistory.return_code === -1) {
        this.props.showPopup(nextProps.userHistory.return_mess, "", "error");
      }
      if (nextProps.userHistory.error === true) {
        this.props.showPopup("Phiên của bạn đã hết hạn", "", "error");
        this.webService.logout();
        this.props.history.push("/login");
      }
    }
  }
  handleGetPayAccApi = () => {
    const self = this;
    self.webService.getPaymentAcc().then(res => {
      if (res.return_code === 1) {
        self.setState({
          accPayList: res.data
        });
      } else if (res.return_code === -1) {
        self.props.showPopup(res.return_mess, "", "error");
      }
    });
  };
  handleGetTransHistoryApi = accountNumber => {
    const self = this;
    self.webService.getTransHistory(accountNumber).then(res => {
      if (res.return_code === 1) {
        self.setState({ accTransList: res.data });
      } else if (res.return_code === -1) {
        self.props.showPopup(res.return_mess, "", "error");
      }
    });
  };
  handleSubmitTransHistory = e => {
    e.preventDefault();
    let accountNumSelInd = e.nativeEvent.target.accList.selectedIndex;
    let accountNumSel = e.nativeEvent.target.accList[accountNumSelInd].text;
    this.props.fetchUserTransData(accountNumSel);
  };
  handleMoreBtn = e => {
    console.log(e);
  };

  render() {
    const accPayList = this.state.accPayList;
    const { loading, accTransList, return_code } = this.props.userHistory;
    return (
      <div className="user-history">
        <div className="user-history-header">
          <h1>LỊCH SỬ GIAO DỊCH</h1>
          <div className="send-money-ico">
            <img src={tradeHistory} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-history-body">
          <form onSubmit={this.handleSubmitTransHistory}>
            <div className="user-history-select">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Tìm lịch sự giao dịch</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accContactId"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Chọn tài khoản
                  </label>
                  <div className="col-form-input-custom">
                    <select
                      id="accList"
                      className="form-control"
                      title="All continents"
                    >
                      <option hidden>Chọn số tài khoản</option>
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
                    htmlFor="accContactName"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Từ
                  </label>
                  <div className="col-form-input-custom">
                    <DatePicker className="form-control" />
                  </div>
                  <label
                    htmlFor="accContactName"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Đến
                  </label>
                  <div className="col-form-input-custom">
                    <DatePicker className="form-control" />
                  </div>
                </div>
                <div className="user-history-footer">
                  <button type="submit" className="btn btn-history">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
            <div className="user-history-list">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Lịch sử giao dịch</p>
                </div>
              </div>
              <div className="form-group form-user-history">
                <div className="bd-example">
                  <table className="table">
                    <thead>
                      <tr className="contact-list-label">
                        <th scope="col">Ngày</th>
                        <th scope="col">Số tài khoản</th>
                        <th scope="col">Số tiền</th>
                        <th scope="col">Xem thêm</th>
                      </tr>
                    </thead>
                    <tbody className="table-scroll">
                      <tr className="loading-spinner-1">
                        {loading === true && (
                          <td>
                            <img
                              src={spinner}
                              alt=""
                              width="60px"
                              height="60px"
                            />
                          </td>
                        )}
                      </tr>
                      {return_code === 1 &&
                      accTransList &&
                      accTransList.length > 0
                        ? accTransList.map((data, index) => {
                            return (
                              <tr key={index}   className="user-history-table-border">
                                <td className="user-history-table-custom">
                                  <table >
                                    <tbody>
                                      <tr>
                                        <td>{data.time}</td>
                                        <td>{data.accountNumber}</td>
                                        <td>{data.amount}</td>
                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-success"
                                            data-toggle="collapse"
                                            data-target={"#" + data.transId}
                                            aria-expanded="false"
                                            aria-controls={data.transId}
                                            onClick={this.handleMoreBtn}
                                          >
                                            <i className="fas fa-plus fa-1x" />
                                          </button>
                                        </td>
                                      </tr>
                                      <tr
                                        className="collapse multi-collapse"
                                        id={data.transId}
                                      >
                                        <td className="user-history-table-custom">
                                          <table>
                                            <tbody>
                                              <tr>
                                                <th scope="col" className="user-history-table-th">Chi tiết</th>
                                                <th scope="col" className="user-history-table-th">Nội dung</th>
                                              </tr>
                                              <tr key={index} className="">
                                                <td>{data.status}</td>
                                                <td>{data.note}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
        {console.log(this.props.userHistory)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userHistory: state.userHistory
});

export default connect(
  mapStateToProps,
  actions
)(UserHistory);
