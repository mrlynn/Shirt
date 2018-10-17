import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './checkout.css';

class Checkout extends Component {
  static propTypes = {
    editOrderClicked: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="checkout">
        <div
          className="checkout-back-button"
          onClick={this.props.editOrderClicked}
        >
          <span className="checkout-back-button-icon">&lsaquo;</span> edit your order
        </div>
        <div className="checkout-title">
          checkout
        </div>
        <div className="purchase-info-container">
          <div className="row">
            <div className="col-7">
              input info
            </div>
            <div className="col-6">
              Summary
            </div>
          </div>
        </div>
        <div className="purchase-checkout-button">
          checkout
        </div>
      </div>
    );
  }
}

export default Checkout;
