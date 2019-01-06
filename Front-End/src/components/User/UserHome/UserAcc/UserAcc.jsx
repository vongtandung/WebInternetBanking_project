import React, { Component } from "react";
import "./UserAcc.css";
import { connect } from "react-redux";
import * as actions from "../../../../actions";
import accContactIco from "../../../../assets/images/ico/acc-contact-ico.png";
import label from "../../../../assets/images/pic/label.png";
import WebService from "../../../../utilities/WebServices";

class UserAcc extends Component {
  constructor() {
    super();
    this.state = {
      accDesList: [],
      accDesSel: null,
      accNum: null,
      accBalance: null,
      modalOpen: false
    };
    this.webService = new WebService();
  }
  componentWillMount() {
    this.handleRoute(true);
    this.props.setTitle("Đóng TK");
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
  handleDelPaymentAccApi = (accountNumber, reciveAccount) => {
    this.webService.delAccPayment(accountNumber, reciveAccount)
      .then(res => {
        if (res.return_code === 1) {
          this.props.showPopup("Đóng tài khoản thành công", "", "success");
          this.refs.accDesId.disabled = true;
          this.refs.btnExchange.disabled = true;
          this.props.fetchUserAccData();
        } else if (res.return_code === -1) {
          this.props.showPopup("Đóng tài khoản thất bại", "", "error");
        }
      }).catch((error) => {
        if (error === 401) {
          this.webService.renewToken()
            .then(res => {
              this.webService.updateToken(res.access_token)
              this.handleDelPaymentAccApi(accountNumber, reciveAccount)
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
  handleFilterAccClose = accountNumSel => {
    let accDesList = [...this.props.userAcc.data];
    accDesList = accDesList.filter((data, index) => {
      return data.accountNumber !== accountNumSel;
    });
    this.setState({ accDesList: accDesList, accDesSel: accDesList[0].accountNumber });
  };
  handleFormCloseChange = (e) => {
    if (e.target.value <= 50000 || this.props.userAcc.data.length <= 1) {
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: true });
    }
  };
  handleFormExchangeChange = (e) => {
    this.setState({ accDesSel: e.target.value });
  };
  handleFormCloseAccSubmit = e => {
    e.preventDefault();
    let accountNumSelInd = e.nativeEvent.target.accCloseId.selectedIndex;
    let accountNumSel = e.nativeEvent.target.accCloseId[accountNumSelInd].text;
    if (e.target.accCloseId.value === "") {
      this.props.showPopup("Vui lòng chọn số tài khoản", "", "error");
    } else if (this.props.userAcc.data.length <= 1) {
      this.props.showPopup("Bạn cần duy trì ít nhất 1 tài khoản", "", "error");
    } else {
      this.refs.accCloseSrcEdit.value = accountNumSel;
      if (e.target.accCloseId.value <= 50000) {
        this.handleDelPaymentAccApi(accountNumSel, "")
      } else {
        this.handleFilterAccClose(accountNumSel);
      }
    }
  };
  handleCloseFormEditSubmit = e => {
    e.preventDefault();
    this.handleDelPaymentAccApi(this.refs.accCloseSrcEdit.value, this.state.accDesSel);
  }

  render() {
    const { data, return_code } = this.props.userAcc;
    const accDesList = this.state.accDesList;
    const modalOpen = this.state.modalOpen;
    return (
      <div className="user-acc-close">
        <div className="user-acc-header">
          <h1>QUẢN LÝ TÀI KHOẢN</h1>
          <div className="send-money-ico">
            <img src={accContactIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-acc-body">
          <form onSubmit={this.handleFormCloseAccSubmit}>
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
                    <select
                      ref="accCloseId"
                      id="accCloseId"
                      className="form-control"
                      onChange={this.handleFormCloseChange}
                    >
                      <option hidden value="">
                        Chọn số tài khoản
                      </option>
                      {return_code === 1 && data && data.length > 0
                        ? data.map((data, index) => {
                          return (
                            <option
                              id={data.accountNumber}
                              key={index}
                              value={data.balance}
                            >
                              {data.accountNumber}
                            </option>
                          );
                        })
                        : null}
                    </select>
                  </div>
                </div>
                <div className="user-close-btn">
                  {modalOpen === true ? (
                    <button
                      type="submit"
                      className="btn btn-acc"
                      data-toggle="modal"
                      data-target="#ModalEdit"
                    >
                      Đóng tài khoản
                    </button>
                  ) : (
                      <button
                        type="submit"
                        className="btn btn-acc"
                      >
                        Đóng tài khoản
                    </button>
                    )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="user-close-footer">
          <div
            ref="modal"
            className="modal fade"
            id="ModalEdit"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ModalEdit"
            aria-hidden="true"
            data-backdrop="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Cập nhật tài khoản
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="user-contact-edit">
                    <form
                      id="contact-edit-form"
                      onSubmit={this.handleCloseFormEditSubmit}
                    >
                      <div className="form-group form-user-inf">
                        <div className="notice" style={{ "color": "red" }}>
                          *Bạn vui lòng chuyển số dư khả dụng sang một tài khoản khác
                        </div>
                        <div className="form-block user-contact-edit-block">
                          <label
                            htmlFor="accCloseSrcEdit"
                            className="col-form-label col-form-label-md col-form-label-custom "
                          >
                            Tài khoản đóng
                          </label>
                          <div className="col-form-input-custom">
                            <input
                              ref="accCloseSrcEdit"
                              type="text"
                              className="form-control"
                              id="accCloseSrcEdit"
                              maxLength="17"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="form-block user-contact-edit-block">
                          <label
                            htmlFor="accCloseDesEdit"
                            className="col-form-label col-form-label-md col-form-label-custom "
                          >
                            Tài khoản nhận
                          </label>
                          <div className="col-form-input-custom">
                            <select
                              ref="accDesId"
                              id="accDesId"
                              className="form-control"
                              onChange={this.handleFormExchangeChange}
                            >
                              {accDesList.length > 0
                                ? accDesList.map((data, index) => {
                                  return (
                                    <option
                                      id={data.accountNumber}
                                      key={index}
                                      value={data.accountNumber}
                                    >
                                      {data.accountNumber}
                                    </option>
                                  );
                                })
                                : null}
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Đóng
                  </button>
                  <button
                    ref="btnExchange"
                    form="contact-edit-form"
                    type="submit"
                    className="btn btn-acc"
                  >
                    Chuyển
                  </button>
                </div>
              </div>
            </div>
          </div>
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
)(UserAcc);
