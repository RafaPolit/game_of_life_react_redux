import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import { connect } from 'react-redux';
import styles from '../styles/main.css';

import Matrix from './Matrix.js';

import * as gameOfLifeActionCreators from '../actions/GameOfLifeActions.js';

class GameOfLife extends Component {

  start() {
    this.interval = this.setInterval(
      () => { this.props.nextGeneration(this.props.matrix); },
      0
    );
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const { numRows, numCols } = this.props;

    return (
      <div>
        <h3>Game of Life</h3>
        <Matrix numRows={numRows} numCols={numCols} />
        <div className="buttons">
          <a onClick={() => this.props.nextGeneration(this.props.matrix)}>Next</a>&nbsp;
          <a onClick={() => this.start()}>Go!</a>&nbsp;
          <a onClick={() => this.stop()}>Stop</a>&nbsp;
        </div>
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return { numRows: state.rows, numCols: state.cols, styles };
};

reactMixin(GameOfLife.prototype, TimerMixin);

export default connect(mapStateToProps, gameOfLifeActionCreators)(GameOfLife);
