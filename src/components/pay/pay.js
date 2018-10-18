import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './pay.css';

import Checkout from '../checkout';
import CloseButton from '../close-button';
import BuildOrder from '../build-order';

const PAYMENT_WINDOWS = {
  BUILD_ORDER: 'BUILD_ORDER',
  CHECKOUT: 'CHECKOUT'
};

const subTotalMock = 70;

class Pay extends Component {
  static propTypes = {
    hidePayWindow: PropTypes.func.isRequired
  }

  state = {
    paymentWindow: PAYMENT_WINDOWS.BUILD_ORDER 
  };

  continuePurchaseClicked = () => {
    this.setState({
      paymentWindow: PAYMENT_WINDOWS.CHECKOUT
    });
  }

  editOrderClicked = () => {
    this.setState({
      paymentWindow: PAYMENT_WINDOWS.BUILD_ORDER
    });
  }

  render() {
    const { paymentWindow } = this.state;

    return (
      <div className="pay-container">
        <div className="pay-background" onClick={this.props.hidePayWindow} />
        <div className="pay">
          <CloseButton onClick={this.props.hidePayWindow} />
          {paymentWindow === PAYMENT_WINDOWS.BUILD_ORDER && <BuildOrder continuePurchaseClicked={this.continuePurchaseClicked} />}
          {paymentWindow === PAYMENT_WINDOWS.CHECKOUT && (
            <Checkout
              editOrderClicked={this.editOrderClicked}
              subtotal={subTotalMock}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Pay;
