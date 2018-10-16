import React, { Component } from 'react';

import './about.css';

import Header from '../header';
import PageLink from '../page-link';

class About extends Component {
  render() {
    return (
      <div className="about">
        <Header />
        <div className="home-links">
          <div className="home-link">
            <PageLink linkText="Home" linkUrl="/" />
          </div>
          <div className="home-link">
            <PageLink linkText="Shirts" linkUrl="shirts" />
          </div>
        </div>
        <div className="about-content">
          <h2 className="about-title">about</h2>
          <p className="about-content">Sofloo is a design studio based in NYC.</p>
          <p className="about-content">Est. 1995</p>
        </div>
      </div>
    );
  }
}

export default About;
