import React, { Component } from "react";
import "./UserSend.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CurrencyInput from "react-currency-input";
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
      accContactList: [],
      accNumSel: "",
      accPaySel: "",
      accContactSel: false,
      accRecName: "",
      accRecExist: false,
      accMoneySend: null,
      accOtpReq: false
    };
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }
  componentWillMount() {
    this.handleRoute(true);
    this.props.setTitle("Chuyển tiền");
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  componentDidMount(prevProps, prevState) {
    this.handleGetPayAccApi();
    this.handleGetContactAccApi();
  }
  handleGetPayAccApi = () => {
    const self = this;
    self.webService
      .getPaymentAcc()
      .then(res => {
        if (res.return_code === 1) {
          self.setState({
            accPayList: res.data,
            accPaySel: res.data[0].balance
          });
        } else if (res.return_code === -1) {
          self.props.showPopup(res.return_mess, "", "error");
        }
      })
      .catch(error => {
        if (error === 401) {
          self.webService
            .renewToken()
            .then(res => {
              self.webService.updateToken(res.access_token);
              self.handleGetPayAccApi();
            })
            .catch(error => {
              self.webService.logout();
              self.props.history.push("/login");
            });
        } else if (error === 403) {
          self.webService.logout();
          self.props.push("/login");
          return;
        }
      });
  };
  handleGetContactAccApi = () => {
    const self = this;
    self.webService
      .getAccContact()
      .then(res => {
        if (res.return_code === 1) {
          self.setState({
            accContactList: res.data
          });
        } else if (res.return_code === -1) {
          self.props.showPopup(res.return_mess, "", "error");
        }
      })
      .catch(error => {
        if (error === 401) {
          self.webService
            .renewToken()
            .then(res => {
              self.webService.updateToken(res.access_token);
              self.handleGetContactAccApi();
            })
            .catch(error => {
              self.webService.logout();
              self.props.history.push("/login");
            });
        } else if (error === 403) {
          self.webService.logout();
          self.props.push("/login");
          return;
        }
      });
  };
  handleGetRevAccApi = accountNumber => {
    const self = this;
    self.webService
      .getInfAcc(accountNumber)
      .then(res => {
        if (res.return_code === 1) {
          self.setState({
            accRecName: res.data[0].name,
            accRecExist: true
          });
        } else if (res.return_code === -1) {
          self.props.showPopup("Không tìm thấy số tài khoản", "", "error");
        }
      })
      .catch(error => {
        if (error === 401) {
          self.webService
            .renewToken()
            .then(res => {
              self.webService.updateToken(res.access_token);
              self.handleGetRevAccApi(accountNumber);
            })
            .catch(error => {
              self.webService.logout();
              self.props.history.push("/login");
            });
        } else if (error === 403) {
          self.webService.logout();
          self.props.push("/login");
          return;
        }
      });
  };
  handleOptApi = accountNumber => {
    const self = this;
    self.setState({ accOtpReq: true }, () => {
      self.webService
        .getOtpAccSend(accountNumber)
        .then(res => {
          if (res.return_code === 1) {
          } else if (res.return_code === -1) {
            self.props.showPopup("Error", "", "error");
          }
        })
        .catch(error => {
          if (error === 401) {
            self.webService
              .renewToken()
              .then(res => {
                self.webService.updateToken(res.access_token);
                self.handleOptApi(accountNumber);
              })
              .catch(error => {
                self.webService.logout(accountNumber);
                self.props.history.push("/login");
              });
          } else if (error === 403) {
            self.webService.logout();
            self.props.push("/login");
            return;
          }
        });
    });
  };
  handleAddContactApi = (accountNumber, name, fullName) => {
    const self = this;
        self.webService.setAccContact(accountNumber, name, fullName).then(res => {
          if (res.return_code === 1) {
          } else if (res.return_code === -1) {
            self.props.showPopup("Error", "", "error");
          }
        }).catch(error => {
        if (error === 401) {
          self.webService
            .renewToken()
            .then(res => {
              self.webService.updateToken(res.access_token);
              self.handleAddContactApi(accountNumber, name, fullName);
            })
            .catch(error => {
              self.webService.logout(accountNumber);
              self.props.history.push("/login");
            });
        } else if (error === 403) {
          self.webService.logout();
          self.props.push("/login");
          return;
        }
      });
  };
  handleMoneyTransferApi = (
    accSend,
    accReci,
    amount,
    note,
    otp,
    fee,
    reciveName,
    accSave,
    accSaveName
  ) => {
    const self = this;
    self.webService
      .getMoneyTransfer(accSend, accReci, amount, note, otp, fee, reciveName)
      .then(res => {
        if (res.return_code === 1) {
          self.props.showPopup("Bạn đã chuyển tiền thành công", "", "success");
          self.setState(
            {
              accPayList: [],
              accNumSel: "",
              accPaySel: "",
              accRecName: "",
              accRecExist: false,
              accMoneySend: null,
              accOtpReq: false
            },
            () => {
              self.refs.accRevId.value = "";
              if (accSave === true) {
                self.handleAddContactApi(accReci, accSaveName, reciveName);
              }
              self.handleGetPayAccApi();
            }
          );
        } else if (res.return_code === -1) {
          if (res.return_mess === "Wrong OTP") {
            self.props.showPopup("OPT không đúng", "", "error");
          } else {
            self.props.showPopup("Chuyển tiền không thành công", "", "error");
          }
        }
      })
      .catch(error => {
        if (error === 401) {
          self.webService
            .renewToken()
            .then(res => {
              self.webService.updateToken(res.access_token);
              self.handleMoneyTransferApi(
                accSend,
                accReci,
                amount,
                note,
                otp,
                fee,
                reciveName,
                accSave,
                accSaveName
              );
            })
            .catch(error => {
              self.webService.logout();
              self.props.history.push("/login");
            });
        } else if (error === 403) {
          self.webService.logout();
          self.props.push("/login");
          return;
        }
      });
  };
  handleRoute = value => {
    this.props.isRoute(value);
  };
  handleAccRevChange = e => {
    e.preventDefault();
    if (this.state.accContactSel === false) {
      if (e.target.value.length > 0 && e.target.value.length < 17) {
        this.setState({
          accRecName: "Đang tìm kiếm ...",
          accRecExist: false
        });
      } else if (e.target.value.length === 0) {
        this.setState({
          accRecName: "",
          accRecExist: false
        });
      } else if (e.target.value.length === 17) {
        this.handleGetRevAccApi(e.target.value);
      }
    }
  };
  handleAccPaySelChange = e => {
    e.preventDefault();
    this.setState({ accPaySel: e.target.value });
  };
  handleAccContactSelChange = e => {
    e.preventDefault();
    if (e.target.value === "") {
      this.setState({ accContactSel: false, accRecName: "" });
      this.refs.accRevId.value = "";
    } else {
      let index = e.target.selectedIndex;
      let optionElement = e.target.childNodes[index];
      let option = optionElement.getAttribute("data-name");
      this.setState({
        accContactSel: true,
        accRecName: option,
        accRecExist: true
      });
      this.refs.accRevId.value = e.target.value;
      this.refs.accRevSave.checked = false;
      this.refs.accRevNameSave.value = "";
    }
  };
  handleMoneySendChange = (e, maskedvalue, floatvalue) => {
    e.preventDefault();
    this.setState({ accMoneySend: floatvalue });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    let accountNumSelInd = e.nativeEvent.target.accList.selectedIndex;
    let accountNumSel = e.nativeEvent.target.accList[accountNumSelInd].text;
    if (this.state.accOtpReq === false) {
      const validate = this.helper.validateSendMoney(
        this.state.accRecExist,
        this.state.accPaySel,
        this.state.accMoneySend,
        e.target.accInfoSend.value
      );
      if (validate.isValid === false) {
        this.props.showPopup(validate.mess, "", "error");
      } else {
        this.handleOptApi(accountNumSel);
      }
    } else {
      this.handleMoneyTransferApi(
        accountNumSel,
        e.target.accRevId.value,
        this.state.accMoneySend,
        e.target.accInfoSend.value,
        e.target.accOtpReq.value,
        e.target.accFeeSend.value,
        e.target.accRevName.value,
        e.target.accRevSave.checked,
        e.target.accRevNameSave.value
      );
    }
  };
  handleSendMoneyBtn = () => {
    if (this.state.accOtpReq === false) {
      return <span>Xác nhận</span>;
    } else {
      return <span>Xác nhận giao dịch</span>;
    }
  };

  render() {
    const accPayList = this.state.accPayList;
    const accContactList = this.state.accContactList;
    const accContactSel = this.state.accContactSel;
    const accPaySel = this.state.accPaySel;
    const accRecName = this.state.accRecName;
    const accMoneySend = this.state.accMoneySend;
    const accOtpReq = this.state.accOtpReq;
    return (
      <div className="user-send-money">
        <div className="user-send-header">
          <h1>CHUYỂN KHOẢN NỘI BỘ</h1>
          <div className="send-money-ico">
            <img src={moneySendIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-send-body">
          <form onSubmit={this.handleFormSubmit}>
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
                      disabled={accOtpReq}
                      onChange={this.handleAccPaySelChange}
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
                    Số dư hiện tại
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <label className="col-form-label col-form-label-lg">
                      {accPaySel} &#8363;
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
                    <select
                      id="accRevList"
                      className="form-control"
                      disabled={accOtpReq}
                      onChange={this.handleAccContactSelChange}
                    >
                      <option value="">Chọn liên hệ có sẵn ...</option>
                      {accContactList.length > 0
                        ? accContactList.map((data, index) => {
                            return (
                              <option
                                key={index}
                                value={data.accountNumber}
                                data-name={data.fullName}
                              >
                                {data.accountNumber} - {data.name}
                              </option>
                            );
                          })
                        : null}
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
                      ref="accRevId"
                      type="text"
                      className="form-control"
                      id="accRevId"
                      placeholder="Nhập số tài khoản"
                      maxLength="17"
                      disabled={accOtpReq || accContactSel}
                      onChange={this.handleAccRevChange}
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
                      disabled={accOtpReq || accContactSel}
                      value={accRecName}
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
                      ref="accRevSave"
                      type="checkbox"
                      className="form-control"
                      id="accRevSave"
                      disabled={accOtpReq || accContactSel}
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
                      ref="accRevNameSave"
                      type="text"
                      className="form-control"
                      id="accRevNameSave"
                      disabled={accOtpReq || accContactSel}
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
                      <CurrencyInput
                        ref="accMoneySend"
                        className="form-control"
                        id="accMoneySend"
                        placeholder="Nhập số tiền"
                        aria-describedby="inputGroupPrepend"
                        precision="0"
                        required
                        value={accMoneySend}
                        disabled={accOtpReq}
                        onChangeEvent={this.handleMoneySendChange}
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
                        disabled={accOtpReq}
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
                      <select
                        ref="accFee"
                        id="accFeeSend"
                        className="form-control"
                        disabled={accOtpReq}
                      >
                        <option value="0">Người chuyển trả</option>
                        <option value="1">Người nhận trả</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="otp-req" hidden={!accOtpReq}>
                  <label
                    htmlFor="accOtpReq"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Mã giao dịch OTP đã được gửi email của bạn, vui lòng nhập
                    OTP để xác nhận giao dịch
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      className="form-control"
                      id="accOtpReq"
                      placeholder="Nhập OTP"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="user-send-footer">
              <button type="submit" className="btn btn-transfer">
                {this.handleSendMoneyBtn()}
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
