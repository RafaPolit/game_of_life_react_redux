import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell.js';

class Matrix extends Component {
  render() {
    // console.log('Rendering matrix');
    const { numRows, numCols, onCells } = this.props;

    let rows = [];

    for (let r = 0; r < numRows; r++) {
      let cells = [];
      for (let c = 0; c < numCols; c++) {
        cells.push(<Cell on={onCells.includes(`${r},${c}`)} key={c} />);
      }
      rows.push(<div className="row" key={r}>{cells}</div>);
    }

    return (
      <div>
        {rows}
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return { onCells: state.matrix };
};

export default connect(mapStateToProps)(Matrix);
