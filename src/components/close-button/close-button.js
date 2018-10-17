import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './close-button.css';

class CloseButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <div
        className="close-button"
        onClick={this.props.onClick}
      >x</div>
    );
  }
}

export default CloseButton;
