import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Path from '../path';

class Shape extends Component {
  static propTypes = {
    gradientColor: PropTypes.bool.isRequired,
    isCurve: PropTypes.bool.isRequired,
    randomShadow: PropTypes.bool.isRequired,
    steps: PropTypes.object.isRequired,
    strokePath: PropTypes.bool.isRequired
  };

  render() {
    const {
      gradientColor,
      id,
      randomShadow,
      steps,
      strokePath
    } = this.props;

    const stepComponents = [];

    _.each(steps, (step, index) => {
      const pathId = `step-${step.id}-shape-${id}`;
      const clipId = `clip-${pathId}`;
      const shadowId = 'svg-shadow';

      const stepColor = gradientColor ? `url(#gradient-${id})` : step.color;

      const pathStyle = {
        fill: !strokePath ? stepColor : 'none',
        stroke: strokePath ? stepColor : 'none',
        strokeWidth: strokePath ? '1px' : '0px'
      };

      if (gradientColor) {
        pathStyle.fillOpacity = (index / steps.length);
      }

      // TODO: I was lazy and did gradient shadows hacky, fix.
      stepComponents.push(
        <Path
          clipId={clipId}
          key={pathId}
          hasShadow={false}
          id={pathId}
          pathPoints={step.pathPoints}
          shadowPathPoints={step.pathPoints}
          shadowId={randomShadow ? `${shadowId}-${pathId}` : shadowId}
          shadowStyle={pathStyle}
          step={step}
          style={pathStyle}
        />
      );
    });

    _.each(steps, (step, index) => {
      if (step.hasShadow) {
        const pathId = `step-${step.id}-shape-${id}`;
        const clipId = `clip-${pathId}`;
        const shadowId = 'svg-shadow';

        const stepColor = gradientColor ? `url(#gradient-${id})` : step.color;

        const pathStyle = {
          fill: !strokePath ? stepColor : 'none',
          stroke: strokePath ? stepColor : 'none',
          strokeWidth: strokePath ? '1px' : '0px'
        };

        if (gradientColor) {
          pathStyle.fillOpacity = (index / steps.length);
        }

        stepComponents.push(
          <Path
            clipId={clipId}
            key={`${pathId}-shadow`}
            hasShadow={step.hasShadow}
            // TODO: I was lazy and did gradient shadows hacky, fix.
            hidePath
            id={pathId}
            pathPoints={step.pathPoints}
            shadowPathPoints={step.pathPoints}
            shadowId={randomShadow ? `${shadowId}-${pathId}` : shadowId}
            shadowStyle={pathStyle}
            step={step}
            style={pathStyle}
          />
        );
      }
    });

    return stepComponents;
  }
}

export default Shape;
