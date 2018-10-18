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
    purchaseShirtClicked: PropTypes.func.isRequired,
    setSoflooRef: PropTypes.func.isRequired
  };

  state = {
    building: true,
    shapes: []
  }

  componentDidMount = () => {
    this.generateNewSofloo();
  }

  setImageRef = image => {
    this.generateSoflooImage(image);
  }

  generateNewSofloo = () => {
    this.setState({ building: true });

    setTimeout(() => {
      const { shapes } = generateRandomLayout(displayWidth, displayHeight, randomizeAlgorithm);
      this.sofloo = <Sofloo
        height={displayHeight}
        setSoflooRef={this.props.setSoflooRef}
        shapes={shapes}
        width={displayWidth}
      />;

      this.setState({
        building: false,
        shapes
      });
    }, 10);
  }

  generateClicked = () => {
    this.generateNewSofloo();
  }

  // sofloo = null;

  render() {
    const { building } = this.state;

    return (
      <div className="generative">
        <div className="row">
          {building && (
            <div className="generative-loading-container">
              <div className="generative-loading-text">
                loading...
              </div>
              {/* <img
                className="generative-loading"
                alt="Loading..."
                src="loading.gif"
              /> */}
            </div>
          )}
          {!building && this.sofloo}
        </div>
        <div className="row">
          <div
            className="generative-generate-button sofloo-button"
            onClick={this.generateClicked}
          >generate art</div>
          <div
            className="generative-build-tee-button sofloo-button-inverse"
            onClick={this.props.purchaseShirtClicked}
          >build a tee</div>
        </div>
      </div>
    );
  }
}

export default Generative;
