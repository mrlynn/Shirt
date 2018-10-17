import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ClipPath from '../clip-path';
import ColorGradient from '../color-gradient';
import SvgShadow from '../shadow';

class ShapeDefs extends Component {
  static propTypes = {
    gradientColor: PropTypes.bool,
    isCurve: PropTypes.bool.isRequired,
    randomShadow: PropTypes.bool.isRequired,
    shape: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired
  };

  render() {
    const {
      gradientColor,
      hasShadow,
      id,
      isCurve,
      randomShadow,
      shape, // Lazy
      steps
    } = this.props;

    const defs = [];

    const shadowId = 'svg-shadow';

    if (hasShadow && !randomShadow) {
      defs.push(
        <SvgShadow
          key="svg-shadow"
          shadowId={shadowId}
          randomShadow={shape.randomShadow}
          shadowBlur={shape.shadowBlur}
          shadowColor={shape.shadowColor}
          shadowInset={shape.shadowInset}
          shadowOffsetX={shape.shadowOffsetX}
          shadowOffsetY={shape.shadowOffsetY}
          shadowOpacity={shape.shadowOpacity}
        />
      );
    }

    if (gradientColor) {
      defs.push(
        <ColorGradient
          key={`${id}-color-gradient`}
          shapeId={id}
          colors={shape.colors}
          gradientDirection={shape.gradientDirection}
        />
      );
    }

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];

      const pathId = `step-${step.id}-shape-${id}`;
      const clipId = `clip-${pathId}`;

      if (hasShadow && randomShadow) {
        defs.push(
          <SvgShadow
            key={`${shadowId}-${pathId}`}
            shadowId={shadowId}
            randomShadow={shape.randomShadow}
            shadowBlur={shape.shadowBlur}
            shadowColor={shape.shadowColor}
            shadowInset={shape.shadowInset}
            shadowOffsetX={shape.shadowOffsetX}
            shadowOffsetY={shape.shadowOffsetY}
            shadowOpacity={shape.shadowOpacity}
          />
        );
      }

      if (step.clipPoints && step.clipPoints.length > 0) {
        if (isCurve) {
          defs.push(
            <clipPath
              clipPath={i === 0 ? '' : `url(#clip-step-${steps[i - 1].id}-shape-${id})`}
              id={clipId}
              key={clipId}
            >
              <ClipPath
                points={step.clipPoints}
              />
            </clipPath>
          );
        } else {
          defs.push(
            <clipPath
              clipPath={i === 0 ? '' : `url(#clip-step-${steps[i - 1].id}-shape-${id})`}
              id={clipId}
              key={clipId}
            >
              <ClipPath
                points={step.clipPoints}
              />
            </clipPath>
          );
        }
      }
    }

    return defs;
  }
}

export default ShapeDefs;
