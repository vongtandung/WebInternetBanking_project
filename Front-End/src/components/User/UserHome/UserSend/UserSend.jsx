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
                    <label className="col-form-label col-form-label-lg">
                      123132132 &#8363;
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
              <div class="form-group form-user-inf">
                <div className="form-block">
                  <label
                    for="accRevList"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tìm kiếm
                  </label>
                  <div className="col-form-input-custom">
                    <select id="accRevList" className="form-control">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accRevId"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Số tài khoản
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      class="form-control"
                      id="accRevId"
                      placeholder="Nhập số tài khoản"
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accRevName"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Tên người hưởng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      class="form-control"
                      id="accRevName"
                      value=""
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accRevSave"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Lưu người hưởng
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="checkbox"
                      class="form-control"
                      id="accRevSave"
                      value=""
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-block">
                  <label
                    for="accRevNameSave"
                    className="col-form-label col-form-label-lg col-form-label-custom"
                  >
                    Nhập tên gợi nhớ
                  </label>
                  <div className="col-form-input-custom col-form-input-readonly">
                    <input
                      type="text"
                      class="form-control"
                      id="accRevNameSave"
                      value=""
                      readOnly
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
                <div class="form-group form-user-inf">
                  <div className="form-block">
                    <label
                      for="accMoneySend"
                      className="col-form-label col-form-label-lg col-form-label-custom"
                    >
                      Số tiền
                    </label>
                    <div className="col-form-input-custom input-group">
                      <input
                        type="text"
                        class="form-control"
                        id="accMoneySend"
                        placeholder="Nhập số tiền"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="accMoneySend">
                          VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-block">
                    <label
                      for="accInfoSend"
                      className="col-form-label col-form-label-lg col-form-label-custom"
                    >
                      Nội dung chuyển
                    </label>
                    <div className="col-form-input-custom col-form-input-readonly">
                      <input
                        type="text"
                        class="form-control"
                        id="accInfoSend"
                        placeholder="Nhập nội dung"
                      />
                    </div>
                  </div>
                  <div className="form-block">
                    <label
                      for="accFeeSend"
                      className="col-form-label col-form-label-lg col-form-label-custom"
                    >
                      Phí chuyển tiền
                    </label>
                    <div className="col-form-input-custom col-form-input-readonly">
                      <select id="accFeeSend" className="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-send-footer">
              <button type="submit" className="btn btn-transfer">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserSend;
