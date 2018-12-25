import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './Error.css'

class Error extends Component {
  constructor(props) {
    super(props);
  }
  popBack=() => {
    this.props.history.push('/')
  }
  componentWillMount() {
    this.props.isLogged(true)
  }
  render() {
    return (
      <div className="error">
        <div className="error-title">
          <h1>Truy cập của bạn không đúng</h1>
        </div>
        <div>
          <button type="button" className="btn btn-danger btn-lg" onClick={this.popBack}>Quay về</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Error);
