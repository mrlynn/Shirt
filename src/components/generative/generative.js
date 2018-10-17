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
    setSofloo: PropTypes.func.isRequired
  };

  state = {
    building: true,
    shapes: []
  }

  componentDidMount = () => {
    // Run the algorithm.
    this.generateNewSofloo();
  }

  generateSoflooImage = () => {
    const svgData = new XMLSerializer().serializeToString(this.sofloo);

    const canvas = document.createElement('canvas');
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    const ctx = canvas.getContext('2d');

    const img = document.createElement('img');
    img.setAttribute('src', `data:image/svg+xml;base64,${btoa(svgData)}`);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, displayWidth, displayHeight);

      canvas.toBlob(blobData => {
        // const blobUrl = window.URL.createObjectURL(blobData);
        // downloadURI(blobUrl, `Concentric-${shareableShortString}.png`);
      });
    };
  }

  generateNewSofloo = () => {
    this.setState({
      building: true
    });

    setTimeout(() => {
      const { shapes } = generateRandomLayout(displayWidth, displayHeight, randomizeAlgorithm);

      this.sofloo = <Sofloo
        height={displayHeight}
        setSvgRef={this.setSvgRef}
        shapes={shapes}
        width={displayWidth}
      />;

      this.props.setSofloo(this.sofloo);

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

  sofloo = null;

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
