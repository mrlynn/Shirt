import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

// import CheckoutForm from './checkout-form';

class Checkout extends Component {
  static propTypes = {
    editOrderClicked: PropTypes.func.isRequired,
    subtotal: PropTypes.number.isRequired
  }

  render() {
    return (
      <Elements>
        <div>
          Coming soon! Sorry! Check back in a week - Sincerely Sofloo. 10/19/2018
        </div>
        {/* <CheckoutForm
          editOrderClicked={this.props.editOrderClicked}
          subtotal={this.props.subtotal}
        /> */}
      </Elements>
    );
  }
}

export default Checkout;
