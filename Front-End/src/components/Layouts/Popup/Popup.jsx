import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import * as actions from '../../../actions';

class Popup extends Component {
  closePopup = () => {
    this.props.closePopup();
  }
  render() {
    return (
      <div className="popup-info">
        <SweetAlert
          show={this.props.popup.show}
          title={this.props.popup.title}
          text={this.props.popup.mess}
          type={this.props.popup.type}
          onConfirm={this.closePopup}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  popup: state.popup
});

export default connect(mapStateToProps, actions)(Popup);