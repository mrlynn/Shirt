import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const createColorString = c => `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a || 1})`;

class SvgColorGradient extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    gradientDirection: PropTypes.object.isRequired
  };

  render() {
    const {
      colors,
      gradientDirection,
      shapeId
    } = this.props;

    const stops = [];

    for (let i = 0; i < colors.length; i++) {
      stops.push(<stop
        key={`stop-${i}-shape-${shapeId}`}
        offset={`${Math.floor(100 * (i / (colors.length - 1)))}%`}
        stopColor={createColorString(colors[i])}
      />);
    }

    return (
      <linearGradient
        id={`gradient-${shapeId}`}
        x1={`${gradientDirection.x1}%`}
        y1={`${gradientDirection.y1}%`}
        x2={`${gradientDirection.x2}%`}
        y2={`${gradientDirection.y2}%`}
        gradientUnits="userSpaceOnUse"
      >
        {stops}
      </linearGradient>
    );
  }
}

export default SvgColorGradient;
