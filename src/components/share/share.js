import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './share.css';

class Share extends Component {
  static propTypes = {
    shareUrl: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="share-container">
        <div className="share-background" onClick={this.props.hideShareWindow} />
        <div className="share">
          <div
            className="share-close-button"
            onClick={this.props.hideShareWindow}
          >x</div>
          <div className="share-title">
            Share Url
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
