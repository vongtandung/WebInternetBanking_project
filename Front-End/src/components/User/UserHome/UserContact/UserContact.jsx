import React, { Component } from "react";
import "./UserContact.css";
import { connect } from "react-redux";
import WebService from "../../../../utilities/WebServices";
import SystemHelper from "../../../../utilities/System.helper";
import * as actions from "../../../../actions";
import accContactIco from "../../../../assets/images/ico/acc-contact-ico.png";
import label from "../../../../assets/images/pic/label.png";

class UserContact extends Component {
  constructor() {
    super();
    this.state = {
      accContactList: [],
      accContactSelId: "",
      accContactSelName: "",
      accRecName: "",
      accRecExist: false
    };
    this.webService = new WebService();
    this.helper = new SystemHelper();
  }

  componentWillMount() {
    this.handleRoute(true);
    this.props.setTitle("Liên hệ");
  }
  componentWillUnmount() {
    this.handleRoute(false);
  }
  componentDidMount() {
    this.handleGetContactApi(true);
  }
  handleRoute = value => {
    this.props.isRoute(value);
  };
  handleGetContactApi = init => {
    this.webService.getAccContact().then(res => {
      if (res.return_code === 1) {
        this.setState({ accContactList: res.data });
      } else if (res.return_code === -1) {
        if (!init) {
          this.props.showPopup(res.return_mess, "", "error");
        }
      }
    });
  };
  handleSetContactApi = (
    accContactId,
    accContactName,
    accRevName,
    isCreate
  ) => {
    this.webService
      .setAccContact(accContactId, accContactName, accRevName)
      .then(res => {
        if (res.return_code === 1) {
          this.setState(
            {
              accRecName: "",
              accRecExist: false
            },
            () => {
              if (isCreate === true) {
                this.props.showPopup("Thêm thành công", "", "success");
              } else {
                this.props.showPopup("Cập nhật thành công", "", "success");
              }
              setTimeout(() => {
                this.handleGetContactApi();
              }, 100);
            }
          );
        } else {
          this.props.showPopup(res.return_mess, "", "error");
        }
      });
  };
  handleDelContactApi = accContactId => {
    this.webService.delAccContact(accContactId).then(res => {
      if (res.return_code === 1) {
        this.props.showPopup("Đã xoá liên hệ", "", "success");
        setTimeout(() => {
          this.handleGetContactApi();
        }, 100);
      } else if (res.return_code === -1) {
        this.props.showPopup("Không thể xoá liên hệ này", "", "error");
      }
    });
  };
  handleGetRevAccApi = accountNumber => {
    const self = this;
    self.webService.getInfAcc(accountNumber).then(res => {
      if (res.return_code === 1) {
        self.setState({
          accRecName: res.data[0].name,
          accRecExist: true
        });
      } else if (res.return_code === -1) {
        self.props.showPopup("Không tìm thấy số tài khoản", "", "error");
      }
    });
  };
  handleAccRevChange = e => {
    e.preventDefault();
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
  };
  handleContactEdit = (accNum, accName, accFullName) => {
    this.refs.accContactIdEdit.value = accNum;
    this.refs.accContactNameEdit.value = accName;
    this.refs.accRevNameEdit.value = accFullName;
  };
  handleContactRemove = accNum => {
    this.handleDelContactApi(accNum);
  };
  handleContactFormSubmit = e => {
    e.preventDefault();
    if (this.state.accRecExist === false) {
      this.props.showPopup(
        "Số tài khoản chưa được nhập hoặc không tìm thấy",
        "",
        "error"
      );
    } else {
      this.handleSetContactApi(
        e.target.accContactId.value,
        e.target.accContactName.value,
        e.target.accRevName.value,
        true
      );
    }
  };
  handleContactFormEditSubmit = e => {
    e.preventDefault();
    this.handleSetContactApi(
      e.target.accContactIdEdit.value,
      e.target.accContactNameEdit.value,
      e.target.accRevNameEdit.value,
      false
    );
  };

  render() {
    const accContactList = this.state.accContactList;
    const accRecName = this.state.accRecName;
    return (
      <div className="user-acc-contact">
        <div className="user-contact-header">
          <h1>DANH SÁCH LIÊN HỆ</h1>
          <div className="send-money-ico">
            <img src={accContactIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-contact-body">
          <form onSubmit={this.handleContactFormSubmit}>
            <div className="user-contact-create">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Thêm liên hệ</p>
                </div>
              </div>
              <div className="form-group form-user-inf">
                <div className="form-block">
                  <label
                    htmlFor="accContactId"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Tài khoản liên hệ
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      type="text"
                      className="form-control"
                      id="accContactId"
                      placeholder="Nhập số tài khoản liên hệ"
                      maxLength="17"
                      onChange={this.handleAccRevChange}
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accRevName"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tên tài khoản
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      ref="nameRecive"
                      type="text"
                      className="form-control"
                      id="accRevName"
                      value={accRecName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    htmlFor="accContactName"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Tên gợi nhớ
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      type="text"
                      className="form-control"
                      id="accContactName"
                      placeholder="Nhập tên gợi nhớ"
                    />
                  </div>
                </div>
                <div className="user-contact-btn">
                  <button type="submit" className="btn btn-history">
                    Thêm liên hệ
                  </button>
                </div>
              </div>
            </div>
            <div className="user-contact-list">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Danh sách liên hệ</p>
                </div>
              </div>
              <div className="form-group form-user-inf-contact">
                <div className="bd-example">
                  <table className="table">
                    <thead>
                      <tr className="contact-list-label">
                        <th scope="col">Tên tài khoản</th>
                        <th scope="col">Tên gợi nhớ</th>
                        <th scope="col">Số tài khoản</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {accContactList.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.fullName}</td>
                            <td>{data.name}</td>
                            <td>{data.accountNumber}</td>
                            <td>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-success btn-table-contact"
                                  data-toggle="modal"
                                  data-target="#ModalEdit"
                                  onClick={() =>
                                    this.handleContactEdit(
                                      data.accountNumber,
                                      data.name,
                                      data.fullName
                                    )
                                  }
                                >
                                  <i className="fas fa-cog" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-table-contact"
                                  onClick={() =>
                                    this.handleContactRemove(data.accountNumber)
                                  }
                                >
                                  <i className="far fa-times-circle" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
          <div className="user-contact-footer">
            <div
              className="modal fade"
              id="ModalEdit"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="ModalEdit"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
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
                              htmlFor="accContactIdEdit"
                              className="col-form-label col-form-label-md col-form-label-custom "
                            >
                              Tài khoản liên hệ
                            </label>
                            <div className="col-form-input-custom">
                              <input
                                ref="accContactIdEdit"
                                type="text"
                                className="form-control"
                                id="accContactIdEdit"
                                maxLength="17"
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="form-block user-contact-edit-block">
                            <label
                              htmlFor="accRevNameEdit"
                              className="col-form-label col-form-label-md col-form-label-custom"
                            >
                              Tên tài khoản
                            </label>
                            <div className="col-form-input-custom col-form-input-readonly">
                              <input
                                ref="accRevNameEdit"
                                type="text"
                                className="form-control"
                                id="accRevNameEdit"
                                value={accRecName}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="form-block user-contact-edit-block">
                            <label
                              htmlFor="accContactNameEdit"
                              className="col-form-label col-form-label-md col-form-label-custom "
                            >
                              Tên gợi nhớ
                            </label>
                            <div className="col-form-input-custom">
                              <input
                                ref="accContactNameEdit"
                                type="text"
                                className="form-control"
                                id="accContactNameEdit"
                                placeholder="Tên gợi nhớ"
                              />
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
                      className="btn btn-primary"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(UserContact);
