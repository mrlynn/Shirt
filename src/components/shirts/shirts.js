import React, { Component } from 'react';

import './shirts.css';

import Header from '../header';
import PageLink from '../page-link';

class Home extends Component {
  render() {
    return (
      <div className="shirts">
        <Header />
        <div className="home-links">
          <div className="home-link">
            <PageLink linkText="Home" linkUrl="/" />
          </div>
          <div className="home-link">
            <PageLink linkText="About" linkUrl="about" />
          </div>
        </div>
        <div className="about-content">
          <h2 className="about-title">shirts</h2>
          <p className="about-content">coming soon</p>
        </div>
      </div>
    );
  }
}

export default Home;
