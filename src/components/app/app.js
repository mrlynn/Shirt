import React, { Component } from 'react';

import Router from '../../router';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router />
      </div>
    );
  }
}

export default App;
