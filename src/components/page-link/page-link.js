import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './page-link.css';

class Header extends Component {
  static propTypes = {
    linkText: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired
  }

  static defaultProps = {

  }

  render() {
    const {
      linkText,
      linkUrl
    } = this.props;

    return (
      <div className="page-link">
        <Link to={linkUrl}>{linkText}</Link>
      </div>
    );
  }
}

export default Header;
