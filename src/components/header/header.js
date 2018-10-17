import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <h1 className="header-title">
            &#9702; Sofloo &#9702;
          </h1>
        </Link>
      </div>
    );
  }
}

export default Header;