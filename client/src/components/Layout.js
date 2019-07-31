import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export class Layout extends Component {
  static propTypes = {};

  render() {
    return <div className="Layout">{this.props.children}</div>;
  }
}

export default Layout;
