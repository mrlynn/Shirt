import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './index.css';

import Shape from './shape';
import ShapeDef from './shape-def';

class Sofloo extends Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    shapes: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.setSvgRef(this.svgRef);
  }

  renderDefs() {
    const {
      shapes
    } = this.props;

    const renderedDefs = [];

    _.each(shapes, (shape, index) => {
      renderedDefs.push(
        <ShapeDef
          id={index}
          key={index}
        />
      );
    });

    return renderedDefs;
  }

  renderShapes() {
    const {
      shapes
    } = this.props;

    const renderedShapes = [];

    _.each(shapes, (shape, index) => {
      renderedShapes.push(
        <Shape
          id={index}
          key={index}
        />
      );
    });

    return renderedShapes;
  }

  render() {
    const {
      height,
      width
    } = this.props;

    return (
      <svg
        className="concentric-js-visual-container"
        height={height}
        ref={ref => { this.svgRef = ref; }}
        style={{
          background: 'none'
        }}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs key="svg-defs">
          {this.renderDefs()}
        </defs>
        {this.renderShapes()}
      </svg>
    );
  }
}

export default Sofloo;
