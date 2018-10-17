import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { SHIRT_COLORS, SHIRT_PLACEMENTS } from '../../constants';

import './shirt-config.css';

class ShirtConfig extends Component {
  static propTypes = {
    orderTShirtButtonClicked: PropTypes.func.isRequired,
    selectNewShirtColor: PropTypes.func.isRequired,
    selectNewShirtPlacement: PropTypes.func.isRequired,
    selectedShirtColor: PropTypes.string.isRequired,
    selectedPlacement: PropTypes.string.isRequired,
    shareShirtButtonClicked: PropTypes.func.isRequired
  }

  render() {
    const { selectedPlacement, selectedShirtColor } = this.props;

    return (
      <div className="shirt-config">
        <div className="sc-title">
          configure your tee
        </div>
        <div className="sc-tee-color">
          <div className="sc-option-title">
            tee color: 
          </div>
          {Object.keys(SHIRT_COLORS).map((color) => {
            return <div
              className={`sc-color-option ${selectedShirtColor === color ? 'sc-color-selected' : ''}`}
              key={color}
              title={color}
              onClick={() => this.props.selectNewShirtColor(color)}
              style={{backgroundColor: SHIRT_COLORS[color]}}
            />;
          })}
        </div>
        <div className="sc-design-placement">
          <div className="sc-option-title">
            design placement: 
          </div>
          {Object.keys(SHIRT_PLACEMENTS).map((placement) => {
            return <img
              className={`sc-placement-option ${selectedPlacement === placement ? 'sc-placement-selected' : ''}`}
              key={placement}
              alt={placement}
              onClick={() => this.props.selectNewShirtPlacement(placement)}
              src={SHIRT_PLACEMENTS[placement]}
            />;
          })}
        </div>
        <div
          className="sofloo-button sc-action-button"
          onClick={this.props.orderTShirtButtonClicked}
        >
          order tee
        </div>
        <div
          className="sofloo-button-inverse sc-action-button"
          onClick={this.props.shareShirtButtonClicked}
        >
          share tee
        </div>
      </div>
    );
  }
}

export default ShirtConfig;
