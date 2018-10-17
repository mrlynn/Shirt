import React, { Component } from 'react';

import './home.css';

import Generative from '../generative';
import Header from '../header';
import Pay from '../pay';
// import PageLink from '../page-link';
import Share from '../share';
import ShirtConfig from '../shirt-config';
import ShirtPreview from '../shirt-preview';

import { SHIRT_COLORS, SHIRT_PLACEMENTS } from '../../constants';

const GENERATIVE_VIEW = 'GENERATIVE_VIEW';
const SHIRT_VIEW = 'SHIRT_VIEW';

class Home extends Component {
  state = {
    currentPage: GENERATIVE_VIEW,
    selectedShirtColor: Object.keys(SHIRT_COLORS)[0],
    selectedPlacement: Object.keys(SHIRT_PLACEMENTS)[0],
    showPayWindow: false,
    showShareWindow: false,
    currentImageUrl: ""
  };

  hidePayWindow = () => {
    this.setState({
      showPayWindow: false
    });
  }

  hideShareWindow = () => {
    this.setState({
      showShareWindow: false
    });
  }

  showPayWindow = () => {
    this.setState({
      showPayWindow: true
    });
  }

  showShareWindow = () => {
    this.setState({
      showShareWindow: true
    });
  }

  regenerateArtClicked = () => {
    this.setState({
      currentPage: GENERATIVE_VIEW
    });
  }

  purchaseShirtClicked = () => {
    this.setState({
      currentPage: SHIRT_VIEW
    });
  }

  selectNewShirtColor = newColor => {
    this.setState({
      selectedShirtColor: newColor
    });
  }

  selectNewShirtPlacement = newPlacement => {
    this.setState({
      selectedPlacement: newPlacement
    });
  }

  setCurrentImageUrl = url => {
    this.setState({ currentImageUrl: url })
  }

  generateMockupsClicked = async (url) => {
    // const mockups = await this.generateMockups(url)
  }

  sofloo = null;

  render() {
    const {
      currentPage,
      selectedPlacement,
      selectedShirtColor,
      showPayWindow,
      showShareWindow
    } = this.state;

    return (
      <div className="home">
        <Header />
        <div className="home-links">
          {/* <div className="home-link">
            <PageLink linkText="Shirts" linkUrl="shirts" />
          </div>
          <div className="home-link">
            <PageLink linkText="About" linkUrl="about" />
          </div> */}
        </div>
        {currentPage === GENERATIVE_VIEW && (
          <Generative
            purchaseShirtClicked={this.purchaseShirtClicked}
            setCurrentImageUrl={this.setCurrentImageUrl}
            generateMockupsClicked={this.generateMockupsClicked}
          />
        )}
        {currentPage === SHIRT_VIEW && (
          <React.Fragment>
            <div className="row">
              <div className="col-8">
                <ShirtPreview
                  regenerateArtClicked={this.regenerateArtClicked}
                  selectedPlacement={selectedPlacement}
                  sofloo={this.sofloo}
                />
              </div>
              <div className="col-4">
                <ShirtConfig
                  orderTShirtButtonClicked={this.showPayWindow}
                  selectedPlacement={selectedPlacement}
                  selectedShirtColor={selectedShirtColor}
                  selectNewShirtColor={this.selectNewShirtColor}
                  selectNewShirtPlacement={this.selectNewShirtPlacement}
                  shareShirtButtonClicked={this.showShareWindow}
                />
              </div>
            </div>
            {showPayWindow && <Pay hidePayWindow={this.hidePayWindow}/>}
            {showShareWindow && <Share
              hideShareWindow={this.hideShareWindow}
              shareUrl="coming soon"
            />}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
