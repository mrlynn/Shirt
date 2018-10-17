import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './shirt.css';

class Shirt extends Component {
  static propTypes = {
    regenerateArtClicked: PropTypes.func.isRequired,
    selectedPlacement: PropTypes.string.isRequired,
    sofloo: PropTypes.node
  };

  render() {
    return (
      <div className="shirt">
        <div className="row">
          <img className="shirt-preview" alt="t-shirt preview" src="tshirt.png"/>
          <div className="shirt-overlay shirt-overlay-pocket">
            {this.props.sofloo}
          </div>
        </div>
        <div className="row">
          <div
            className="shirt-regenerate-button"
            onClick={this.props.regenerateArtClicked}
          >regenerate</div>
        </div>
      </div>
    );
  }
}

export default Shirt;
