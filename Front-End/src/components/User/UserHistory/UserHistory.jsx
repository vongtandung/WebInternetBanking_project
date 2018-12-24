import React, { Component } from "react";
import "./UserHistory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import tradeHistory from "../../../assets/images/ico/history-trade-ico.png";
import label from "../../../assets/images/pic/label.png";

class UserHistory extends Component {
  render() {
    return (
      <div className="user-history">
        <div className="user-history-header">
          <h1>LỊCH SỬ GIAO DỊCH</h1>
          <div className="send-money-ico">
            <img src={tradeHistory} alt="" className="user-send-ico" />
          </div>
        </div>
        <div className="user-history-body">
          <form>
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
                    <select id="accList" className="form-control">
                      <option defaultValue>Choose...</option>
                      <option>...</option>
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
                      </tr>
                    </thead>
                    <tbody className="table-scroll">
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Mark</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Mark</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Mark</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Mark</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Mark</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
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

export default UserHistory;
