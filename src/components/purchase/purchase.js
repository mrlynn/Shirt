import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './purchase.css';

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

class Purchase extends Component {
  static propTypes = {
    hidePurchaseWindow: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="purchase-container">
        <div className="purchase-background" onClick={this.props.hidePurchaseWindow} />
        <div className="purchase">
          <div className="purchase-title">
            Your Order
          </div>
          <div className="purchase-info-container">
            <div className="row">
              <div className="col-11">
                <div className="row">
                  <div className="col-3 purchase-info-title">
                    Quantity
                  </div>
                  <div className="col-3 purchase-info-title">
                    Size
                  </div>
                  <div className="col-3 purchase-info-title">
                    Unit Price
                  </div>
                  <div className="col-3 purchase-info-title">
                    Price
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
                <div className="col-1 purchase-remove-item">
                  X
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-11">
              <div className="row">
                <div className="col-6 purchase-add-another">
                  + Add another size
                </div>
                <div className="col-6">
                  <div 
                    className="purchase-subtotal-container"
                  >
                    <div className="row">
                      <div className="col-6">
                        Subtotal
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
          <div className="purchase-button">
            checkout
          </div>
        </div>
      </div>
    );
  }
}

export default Purchase;
