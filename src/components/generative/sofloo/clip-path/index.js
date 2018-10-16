import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const ClipPath = props => {
  const {
    points
  } = props;

  let pathDString = '';

  _.each(points, point => {
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

  return <path d={pathDString} />;
};

ClipPath.propTypes = {
  points: PropTypes.array.isRequired
};

export default ClipPath;
