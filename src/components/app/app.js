import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import Router from '../../router';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <StripeProvider apiKey="pk_test_12345">
          <Router />
        </StripeProvider>
      </div>
    );
  }
}

export default App;
