import React, { Component } from 'react';

import './shirt.css';

class Shirt extends Component {
  render() {
    return (
      <div className="shirt">
        <img className="shirt-preview" alt="t-shirt preview" src="tshirt.png"/>
      </div>
    );
  }
}

export default Shirt;
