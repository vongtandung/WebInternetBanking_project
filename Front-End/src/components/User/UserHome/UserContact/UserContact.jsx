import React, { Component } from "react";
import "./UserContact.css";
import accContactIco from "../../../../assets/images/ico/acc-contact-ico.png";
import label from "../../../../assets/images/pic/label.png";
class UserContact extends Component {
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
      <div className="user-acc-contact">
        <div className="user-contact-header">
          <h1>Danh sách tài khoản</h1>
          <div className="send-money-ico">
            <img src={accContactIco} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-contact-body">
          <form>
            <div className="user-contact-create">
              <div className="arrow-tag clearfix">
                <img src={label} alt="tag-next" />
                <div className="text">
                  <p>Thêm liên hệ</p>
                </div>
              </div>
              <div class="form-group form-user-inf">
                <div className="form-block">
                  <label
                    for="accContactId"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Tài khoản liên hệ
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      type="text"
                      class="form-control"
                      id="accContactId"
                      placeholder="Nhập số tài khoản liên hệ"
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accContactName"
                    className="col-form-label col-form-label-lg col-form-label-custom "
                  >
                    Tên gợi nhớ
                  </label>
                  <div className="col-form-input-custom">
                    <input
                      type="text"
                      class="form-control"
                      id="accContactName"
                      placeholder="Nhập tên gợi nhớ"
                    />
                  </div>
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
              <div class="form-group form-user-inf-contact">
                  <div class="bd-example">
                    <table class="table">
                      <thead>
                        <tr className="contact-list-label">
                          <th scope="col">Tên tài khoản</th>
                          <th scope="col">Số tài khoản</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserContact;
