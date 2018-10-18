import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './shirt.css';
import { SHIRT_COLORS } from '../../constants';

class Shirt extends Component {
  static propTypes = {
    haveMockups: PropTypes.bool.isRequired,
    mockups: PropTypes.array.isRequired,
    regenerateArtClicked: PropTypes.func.isRequired,
    selectedPlacement: PropTypes.string.isRequired,
    selectedShirtColor: PropTypes.string.isRequired
  };

  render() {
    const {
      haveMockups,
      mockups,
      selectedPlacement,
      selectedShirtColor
    } = this.props;

    return (
      <div className="shirt">
        <div className="shirt-preview-container">
          {!haveMockups && (
            <div className="shirt-generating-mockups">
              <div>
                Creating t shirt mockup...
              </div>
              <div className="shirt-generating-loader" />
            </div>
          )}
            {haveMockups && mockups.map(mockup => {
              const isColor = (selectedShirtColor === mockup.color.color.toLowerCase()) || (selectedShirtColor === mockup.color.color.toLowerCase());
              const isMockup = isColor && selectedPlacement.toLowerCase() === mockup.placement.toLowerCase();
              return isMockup ? <img key={`${mockup.placement}-${mockup.color.color}`} className="shirt-preview" src={mockup.mockupURL} alt="Shirt mockup"/> : null;
            })}
        </div>
        <div className="row">
          <div
            className="sofloo-button-inverse"
            onClick={this.props.regenerateArtClicked}
          >regenerate</div>
        </div>
      </div>
    );
  }
}

export default Shirt;
