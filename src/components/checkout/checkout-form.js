import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { CardElement, injectStripe } from 'react-stripe-elements';

import './checkout.css';
import './stripe-styling.css';

class CheckoutForm extends Component {
  static propTypes = {
    editOrderClicked: PropTypes.func.isRequired,
    subtotal: PropTypes.number.isRequired
  }

  checkoutClicked = () => {
    alert('Thanks');
  }

  handleCheckout = ev => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  selectBillingCountry = newCountry => {
    this.setState({ billingCountry: newCountry });
  }

  selectBillingRegion = newRegion => {
    this.setState({ billingRegion: newRegion });
  }

  selectShippingCountry = newCountry => {
    this.setState({ shippingCountry: newCountry });
  }

  selectShippingRegion = newRegion => {
    this.setState({ shippingRegion: newRegion });
  }

  state = {
    billingName: '',
    billingAddress: '',
    billingZip: '',
    billingCity: '',
    billingCountry: '',
    billingRegion: '',

    email: '',

    sameShippingAndBilling: true,

    shippingName: '',
    shippingAddress: '',
    shippingZip: '',
    shippingCity: '',
    shippingCountry: '',
    shippingRegion: '',

    shippingPrice: null,
    taxPrice: null,
    totalPrice: null
  }

  render() {
    const { sameShippingAndBilling } = this.state;

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
        <div className="checkout-container">
          <div className="row">
            <div className="col-8">
              <div className="checkout-section-title">
                {sameShippingAndBilling ? 'Billing & Shipping info' : 'Billing info'}
              </div>
              <div className="checkout-input-item">
                <label className="checkout-different-billing-toggle">
                  <input
                    name="sameShippingAndBilling"
                    type="checkbox"
                    checked={sameShippingAndBilling}
                    onChange={this.handleInputChange} />
                  <div className="checkout-different-billing-toggle-text">
                    Same billing &amp; shipping address
                  </div>
                </label>
              </div>

              
              <div className="checkout-input-item">
                <label>
                  <input
                    className="checkout-input-field"
                    name="billingName"
                    placeholder="Name"
                    type="text"
                    value={this.state.billingName}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="checkout-input-item">
                <label>
                  <input
                    className="checkout-input-field"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="checkout-input-item">
                <label>
                  <input
                    className="checkout-input-field"
                    name="billingAddress"
                    placeholder={sameShippingAndBilling ? 'Address' : 'Billing address'}
                    type="text"
                    value={this.state.billingAddress}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="checkout-input-item">
                <label>
                  <input
                    className="checkout-input-field"
                    name="billingCity"
                    placeholder={sameShippingAndBilling ? 'City' : 'Billing city'}
                    type="text"
                    value={this.state.billingCity}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="checkout-input-item">
                <label>
                  <input
                    className="checkout-input-field"
                    name="billingZip"
                    placeholder={sameShippingAndBilling ? 'Zip' : 'Billing zip'}
                    type="text"
                    value={this.state.billingZip}
                    onChange={this.handleInputChange} />
                </label>
              </div>
              <div className="checkout-input-item">
                <div className="checkout-item-label">
                  Country &amp; Region
                </div>
                <CountryDropdown
                  value={this.state.billingCountry}
                  onChange={this.selectBillingCountry} />
                <RegionDropdown
                  country={this.state.billingCountry}
                  value={this.state.billingRegion}
                  onChange={this.selectBillingRegion} />
              </div>



              {!sameShippingAndBilling && (
                <div className="checkout-section">
                  <div className="checkout-section-title">
                    Shipping info
                  </div>
                  <div className="checkout-input-item">
                    <label>
                      <input
                        className="checkout-input-field"
                        name="shippingName"
                        placeholder="Name"
                        type="text"
                        value={this.state.shippingName}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <div className="checkout-input-item">
                    <label>
                      <input
                        className="checkout-input-field"
                        name="billingAddress"
                        placeholder="Shipping address"
                        type="text"
                        value={this.state.billingAddress}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <div className="checkout-input-item">
                    <label>
                      <input
                        className="checkout-input-field"
                        name="billingCity"
                        placeholder="Shipping city"
                        type="text"
                        value={this.state.billingCity}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <div className="checkout-input-item">
                    <label>
                      <input
                        className="checkout-input-field"
                        name="billingZip"
                        placeholder="Shipping zip"
                        type="text"
                        value={this.state.billingZip}
                        onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <div className="checkout-input-item">
                    <div className="checkout-item-label">
                      Country &amp; Region
                    </div>
                    <CountryDropdown
                      value={this.state.billingCountry}
                      onChange={this.selectBillingCountry} />
                    <RegionDropdown
                      country={this.state.billingCountry}
                      value={this.state.billingRegion}
                      onChange={this.selectBillingRegion} />
                  </div>
                </div>
              )}



              <div className="checkout-section">
                <div className="checkout-section-title">
                  Payment info
                </div>
                <CardElement
                  style={{
                    base: {
                      fontSize: '16px'
                    }
                  }}
                />
              </div>
            </div>



            <div className="col-4">
              <div className="checkout-prices">
                <div className="row">
                  <div className="col-6 checkout-info-label">
                    Subtotal
                  </div>
                  <div className="col-6 checkout-info-item">
                    $ {this.props.subtotal}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 checkout-info-label">
                    Shipping
                  </div>
                  <div className="col-6 checkout-info-item">
                    {this.state.shippingPrice ? `$ ${this.state.shippingPrice}` : '-'}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 checkout-info-label">
                    Tax
                  </div>
                  <div className="col-6 checkout-info-item">
                    {this.state.taxPrice ? `$ ${this.state.taxPrice}` : '-'}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 checkout-total">
                    Total
                  </div>
                  <div className="col-6 checkout-total-item">
                    {this.state.totalPrice ? `$ ${this.state.totalPrice}` : '-'}
                  </div>
                </div>
              </div>
              <div className="checkout-button-container">
                <div
                  className="sofloo-button"
                  onClick={this.checkoutClicked}
                >
                  checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
