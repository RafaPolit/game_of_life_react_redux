import React, { Component } from 'react';

export default class Cell extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.on !== nextProps.on;
  }

  render() {
    // console.log('Rendered cell');
    return (
      <span className={ this.props.on ? 'cell on' : 'cell'}></span>
    );
  }
}
