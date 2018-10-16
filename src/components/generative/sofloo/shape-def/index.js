import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ClipPath from '../clip-path';
import ColorGradient from '../color-gradient';
import SvgShadow from '../shadow';

class ShapeDefs extends Component {
  static propTypes = {
    gradientColor: PropTypes.bool.isRequired,
    isCurve: PropTypes.bool.isRequired,
    randomShadow: PropTypes.bool.isRequired,
    steps: PropTypes.object.isRequired
  };

  render() {
    const {
      gradientColor,
      hasShadow,
      id,
      isCurve,
      randomShadow,
      steps
    } = this.props;

    const defs = [];

    const shadowId = 'svg-shadow';

    if (hasShadow && !randomShadow) {
      defs.push(
        <SvgShadow
          key="svg-shadow"
          shadowId={shadowId}
        />
      );
    }

    if (gradientColor) {
      defs.push(
        <ColorGradient
          key={`${id}-color-gradient`}
          shapeId={id}
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
