import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { VERSIONS } from '../../constants';
import { generateRandomLayout } from '../../sofloo/layouts';

import Sofloo from './sofloo';

import './generative.css';

const displayHeight = 500;
const displayWidth = 600;

const randomizeAlgorithm = VERSIONS.FULL_RANDOM;

class Generative extends Component {
  static propTypes = {
    purchaseShirtClicked: PropTypes.func.isRequired
  };

  state = {
    building: true,
    shapes: []
  }

  componentDidMount = () => {
    // Run the algorithm.
    this.generateNewSofloo();
  }

  generateNewSofloo = () => {
    this.setState({
      building: true
    });

    setImmediate(() => {
      // TODO: Something.
      const { shapes } = generateRandomLayout(displayWidth, displayHeight, randomizeAlgorithm);

      this.setState({
        building: false,
        shapes
      });
    });
  }

  generateClicked = () => {
    this.generateNewSofloo();
  }

  setSvgRef = ref => {
    // TODO: Something.
  }

  render() {
    const { shapes } = this.state;

    return (
      <div className="generative">
        <Sofloo
          height={displayHeight}
          setSvgRef={this.setSvgRef}
          shapes={shapes}
          width={displayWidth}
        />
        <div
          className="generative-next-button"
          onClick={this.generateClicked}
        >Generate</div>
        <div
          className="generative-next-button"
          onClick={this.props.purchaseShirtClicked}
        >Purchase</div>
      </div>
    );
  }
}

export default Generative;
