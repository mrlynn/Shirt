import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { SHIRT_PLACEMENTS } from '../../constants';

import './shirt-config.css';

const SHIRT_COLORS = {
  black: '#000',
  white: '#FFF'
};

let selectedColor = Object.keys(SHIRT_COLORS)[0];

class ShirtConfig extends Component {
  static propTypes = {
    orderTShirtButtonClicked: PropTypes.func.isRequired,
    selectedPlacement: PropTypes.string.isRequired,
    shareShirtButtonClicked: PropTypes.func.isRequired
  }

  render() {
    const { selectedPlacement } = this.props;

    return (
      <div className="shirt-config">
        <div className="sc-title">
          configure your tee
        </div>
        <div className="sc-tee-color shirt-config-option">
          <div className="sc-option-title">
            tee color: 
          </div>
          {Object.keys(SHIRT_COLORS).map((color) => {
            return <div
              className={`sc-color-option ${selectedColor === color ? 'sc-color-selected' : ''}`}
              key={color}
              title={color}
              style={{backgroundColor: SHIRT_COLORS[color]}}
            />;
          })}
        </div>
        <div className="sc-design-placement shirt-config-option">
          <div className="sc-option-title">
            design placement: 
          </div>
          {Object.keys(SHIRT_PLACEMENTS).map((placement) => {
            return <img
              className={`sc-placement-option ${selectedPlacement === placement ? 'sc-placement-selected' : ''}`}
              key={placement}
              alt={placement}
              src={SHIRT_PLACEMENTS[placement]}
            />;
          })}
        </div>
        <div
          className="sc-order-tee shirt-config-option"
          onClick={this.props.orderTShirtButtonClicked}
        >
          order tee
        </div>
        <div
          className="sc-order-tee shirt-config-option"
          onClick={this.props.shareShirtButtonClicked}
        >
          share tee
        </div>
      </div>
    );
  }
}

export default ShirtConfig;
