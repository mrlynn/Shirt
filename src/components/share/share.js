import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './share.css';

import CloseButton from '../close-button';

class Share extends Component {
  static propTypes = {
    hideShareWindow: PropTypes.func.isRequired,
    shareUrl: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="share-container">
        <div className="share-background" onClick={this.props.hideShareWindow} />
        <div className="share">
        <CloseButton onClick={this.props.hideShareWindow}/>
          <div className="share-title">
            share url
          </div>
          <div>
            coming soon
          </div>
        </div>
      </div>
    );
  }
}

export default Share;
