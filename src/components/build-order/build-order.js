import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Select from 'react-select';

import './build-order.css';

const sizeOptions = [
  { value: 'small', label: 'S' },
  { value: 'medium', label: 'M' },
  { value: 'large', label: 'L' },
  { value: 'extra-large', label: 'XL' }
];

// const mockOrders = [{
//   quantity: 2,
//   size: 'M',
//   unitPrice: 15
// }, {
//   quantity: 2,
//   size: 'L',
//   unitPrice: 20
// }];

const calculatingPrice = false;

class BuildOrder extends Component {
  static propTypes = {
    continuePurchaseClicked: PropTypes.func.isRequired
  }

  state = {
    orders: [{
      quantity: 1,
      size: 'M',
      unitPrice: 25
    }]
  }

  handleSelectSize = (key, newSize) => {
    const newOrders = [...this.state.orders];

    newOrders[key].size = newSize;

    this.setState({ orders: newOrders });
  }

  handleUpdateQuantity = (key, newQuantity) => {
    const newOrders = [...this.state.orders];

    newOrders[key].quantity = newQuantity;

    this.setState({ orders: newOrders });
  }

  removeOrder = index => {
    const newOrders = this.state.orders.splice(index, 1);

    this.setState({ orders: newOrders });
  }

  addNewOrder = () => {
    const newOrders = [...this.state.orders, {
      quantity: 1,
      size: 'M',
      unitPrice: 25
    }];

    this.setState({
      orders: newOrders
    });
  }

  render() {
    const { orders } = this.state;

    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].quantity * orders[i].unitPrice;
    }

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
        {this.state.orders.map((order, index) => (
          <div
            className="purchase-info-container"
            key={`${index}_${order.quantity}_${order.size}`}
          >
            <div className="row">
              <div className="col-11">
                <div className="row">
                  <div className="col-3 purchase-info-item">
                    <label>
                      <input
                        className="purchase-input-quantity"
                        name="quantity"
                        placeholder="quantity"
                        type="number"
                        value={order.quantity}
                        onChange={e => this.handleUpdateQuantity(index, e.target.value)} />
                    </label>
                  </div>
                  <div className="col-3 purchase-info-item">
                    <Select
                      value={order.size}
                      onChange={selectedOption => this.handleSelectSize(index, selectedOption)}
                      options={sizeOptions}
                    />
                  </div>
                  <div className="col-3 purchase-info-item">
                    {calculatingPrice ? <div className="purchase-loader"/> : `$ ${order.unitPrice}`}
                  </div>
                  <div className="col-3 purchase-info-item">
                    {calculatingPrice ? <div className="purchase-loader"/> : `$ ${order.unitPrice * order.quantity}`}
                  </div>
                </div>
              </div>
              {this.state.orders.length > 1 && (
                <div
                  className="col-1 purchase-remove-item"
                  onClick={index => this.removeOrder(index)}
                >
                  X
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-11">
            <div className="row">
              <div
                className="col-6 purchase-add-another"
                onClick={this.addNewOrder}
              >
                + add another size
              </div>
              <div className="col-6">
                <div 
                  className="purchase-subtotal-container"
                >
                  <div className="row">
                    <div className="col-6 purchase-subtotal-title">
                      subtotal
                    </div>
                    <div className="col-6">
                      <div className="col-6 purchase-subtotal">
                        $ {total}
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
          className="sofloo-button"
          onClick={this.props.continuePurchaseClicked}
        >
          continue
        </div>
      </div>
    );
  }
}

export default BuildOrder;
