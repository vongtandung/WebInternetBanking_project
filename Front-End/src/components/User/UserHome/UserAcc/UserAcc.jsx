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
      accNum: null,
      accBalance: null,
      modalOpen: ""
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
  handleFilterAccClose = accountNumSel => {
    let accDesList = [...this.props.userAcc.data];
    accDesList = accDesList.filter((data, index) => {
      return data.accountNumber !== accountNumSel;
    });
    this.setState({ accDesList: accDesList });
  };
  handleFormCloseAccSubmit = e => {
    e.preventDefault();
    let accountNumSelInd = e.nativeEvent.target.accCloseId.selectedIndex;
    let accountNumSel = e.nativeEvent.target.accCloseId[accountNumSelInd].text;
    console.log(e.target.accCloseId.value)
    if (e.target.accCloseId.value === "") {
      this.props.showPopup("Vui lòng chọn số tài khoản", "", "error");
    } else {
      this.handleFilterAccClose(accountNumSel);
      this.refs.accCloseSrcEdit.value = accountNumSel;
      if (e.target.accCloseId.value >= 50000) {
        this.setState(
          {
            modalOpen: "modal"
          },
          () => {}
        );
      } else {
      }
    }
  };
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
                      placeholder="asddda"
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
                  <button
                    type="submit"
                    className="btn btn-acc"
                    data-toggle="modal"
                    data-target="#ModalEdit"
                  >
                    Đóng tài khoản
                  </button>
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
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Cập nhật liên hệ
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="user-contact-edit">
                    <form
                      id="contact-edit-form"
                      onSubmit={this.handleContactFormEditSubmit}
                    >
                      <div className="form-group form-user-inf">
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
                            >
                              <option hidden>Chọn số tài khoản</option>
                              {accDesList.length > 0
                                ? accDesList.map((data, index) => {
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
