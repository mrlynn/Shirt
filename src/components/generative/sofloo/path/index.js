import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import './index.css';

const Path = props => {
  const {
    clipId,
    hasShadow,
    id,
    pathPoints,
    shadowPathPoints,
    shadowId,
    shadowStyle,
    style
  } = props;

  let shadowPathDString = '';

  if (hasShadow) {
    _.each(shadowPathPoints, point => {
      shadowPathDString += `${point.type} `;
      if (point.type === 'C') {
        const cp = point.cp;
        shadowPathDString += `${cp[0].x} ${cp[0].y} ${cp[1].x} ${cp[1].y} `;
      } else if (point.type === 'S') {
        const cp = point.cp;
        shadowPathDString += `${cp[1].x} ${cp[1].y} `;
      }
      shadowPathDString += `${point.x} ${point.y} `;
    });
  }

  let pathDString = '';

  _.each(pathPoints, point => {
    pathDString += `${point.type} `;
    if (point.type === 'C') {
      const cp = point.cp;
      pathDString += `${cp[0].x} ${cp[0].y} ${cp[1].x} ${cp[1].y} `;
    } else if (point.type === 'S') {
      const cp = point.cp;
      pathDString += `${cp[1].x} ${cp[1].y} `;
    }
    pathDString += `${point.x} ${point.y} `;
  });

  return (
    <g
      clipPath={clipId ? `url(#${clipId})` : ''}
      id={id}
    >
      <path
        className={`step-path path-${id}`}
        d={pathDString}
        style={style}
      />
      {hasShadow &&
        <path
          d={shadowPathDString}
          style={{
            ...shadowStyle,
            filter: `url(#${shadowId})`
          }}
        />
      }
    </g>
  );
};

Path.propTypes = {
  clipId: PropTypes.string.isRequired,
  hasShadow: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  pathPoints: PropTypes.array.isRequired,
  shadowPathPoints: PropTypes.array,
  shadowId: PropTypes.string,
  shadowStyle: PropTypes.object,
  style: PropTypes.object
};

export default Path;
