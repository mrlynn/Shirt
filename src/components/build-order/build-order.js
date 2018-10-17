import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './build-order.css';

const mockOrders = [{
  quantity: 2,
  size: 'M',
  unitPrice: 15
}, {
  quantity: 2,
  size: 'L',
  unitPrice: 20
}];

const mockTotalAmount = 50;

const calculatingPrice = false;

class BuildOrder extends Component {
  static propTypes = {
    continuePurchaseClicked: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="purchase">
        <div className="purchase-title">
          your sofloo order
        </div>
        <div className="purchase-info-container">
          <div className="row">
            <div className="col-11">
              <div className="row">
                <div className="col-3 purchase-info-title">
                  quantity
                </div>
                <div className="col-3 purchase-info-title">
                  size
                </div>
                <div className="col-3 purchase-info-title">
                  unit price
                </div>
                <div className="col-3 purchase-info-title">
                  price
                </div>
              </div>
            </div>
            <div className="col-1"/>
          </div>
        </div>
        {mockOrders.map((order, index) => (
          <div
            className="purchase-info-container"
            key={`${index}_${order.quantity}_${order.size}`}
          >
            <div className="row">
              <div className="col-11">
                <div className="row">
                  <div className="col-3 purchase-info-item">
                    {order.quantity}
                  </div>
                  <div className="col-3 purchase-info-item">
                    {order.size}
                  </div>
                  <div className="col-3 purchase-info-item">
                    {calculatingPrice ? <div className="purchase-loader"/> : `$ ${order.unitPrice}`}
                  </div>
                  <div className="col-3 purchase-info-item">
                    {calculatingPrice ? <div className="purchase-loader"/> : `$ ${order.unitPrice * order.quantity}`}
                  </div>
                </div>
              </div>
              <div
                className="col-1 purchase-remove-item"
                onClick={() => {alert('todo');}}
              >
                X
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-11">
            <div className="row">
              <div
                className="col-6 purchase-add-another"
                onClick={() => {alert('todo');}}
              >
                + add another size
              </div>
              <div className="col-6">
                <div 
                  className="purchase-subtotal-container"
                >
                  <div className="row">
                    <div className="col-6">
                      subtotal
                    </div>
                    <div className="col-6">
                      <div className="col-6 purchase-subtotal">
                        $ {mockTotalAmount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-1"/>
        </div>
        <div
          className="purchase-checkout-button"
          onClick={this.props.continuePurchaseClicked}
        >
          continue
        </div>
      </div>
    );
  }
}

export default BuildOrder;
