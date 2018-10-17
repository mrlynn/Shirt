import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { VERSIONS } from '../../constants';
import { generateRandomLayout } from '../../sofloo/layouts';

import Sofloo from './sofloo';

import './generative.css';

const displayHeight = 500;
const displayWidth = 500;

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

    setTimeout(() => {
      const { shapes } = generateRandomLayout(displayWidth, displayHeight, randomizeAlgorithm);

      this.setState({
        building: false,
        shapes
      });
    }, 10);
  }

  generateClicked = () => {
    this.generateNewSofloo();
  }

  setSvgRef = ref => {
    // TODO: Something.
  }

  render() {
    const { building, shapes } = this.state;

    return (
      <div className="generative">
        <div className="row">
          {building && (
            <div className="generative-loading-container">
              <div className="generative-loading-text">
                Loading...
              </div>
              <img
                className="generative-loading"
                alt="Loading..."
                src="loading.gif"
              />
            </div>
          )}
          {!building && <Sofloo
            height={displayHeight}
            setSvgRef={this.setSvgRef}
            shapes={shapes}
            width={displayWidth}
          />}
        </div>
        <div className="row">
          <div
            className="generative-next-button"
            onClick={this.generateClicked}
          >Generate Art</div>
          <div
            className="generative-next-button"
            onClick={this.props.purchaseShirtClicked}
          >Build a Tee</div>
        </div>
      </div>
    );
  }
}

export default Generative;
