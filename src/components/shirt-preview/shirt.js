import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './shirt.css';

class Shirt extends Component {
  static propTypes = {
    regenerateArtClicked: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="shirt">
        <div className="row">
          <img className="shirt-preview" alt="t-shirt preview" src="tshirt.png"/>
        </div>
        <div className="row">
          <div
            className="shirt-regenerate-button"
            onClick={this.props.regenerateArtClicked}
          >Regenerate</div>
        </div>
      </div>
    );
  }
}

export default Shirt;
