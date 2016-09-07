// import { List, Map } from 'immutable';
import { fromJS } from 'immutable';
import * as ActionTypes from '../constants/ActionTypes.js';

const numRows = 50;
const numCols = 50;

const startOnCells = fromJS([
  '0,1',
  '1,2',
  '2,0',
  '2,1',
  '2,2'
]);

const randomMatrix = () => {
  const onCells = [];
  const rowsBlock = Math.floor(numRows / 4);
  const colsBlock = Math.floor(numRows / 4);
  for (let row = rowsBlock; row <= rowsBlock * 3; row ++) {
    for (let col = colsBlock; col <= colsBlock * 3; col ++) {
      if (Math.round(Math.random())) {
        onCells.push(`${row},${col}`);
      }
    }
  }
  // const rowsThird = Math.floor(numRows / 3);
  // const colsThird = Math.floor(numRows / 3);
  // for (let row = rowsThird; row <= rowsThird * 2; row ++) {
  //   for (let col = colsThird; col <= colsThird * 2; col ++) {
  //     if (Math.round(Math.random())) {
  //       onCells.push(`${row},${col}`);
  //     }
  //   }
  // }
  // for (let row = 0; row <= numRows; row ++) {
  //   for (let col = 0; col <= numCols; col ++) {
  //     if (Math.round(Math.random())) {
  //       onCells.push(`${row},${col}`);
  //     }
  //   }
  // }

  return fromJS(onCells);
};

const determineRanges = (onCells) => {
  const ranges = { rows: { min: 1000, max: -1000 }, cols: { min: 1000, max: -1000 } };

  onCells.forEach((cell) => {
    const cellArray = cell.split(',');

    ranges.rows.min = Math.min(ranges.rows.min, Number(cellArray[0]) - 1);
    ranges.rows.max = Math.max(ranges.rows.max, Number(cellArray[0]) + 1);
    ranges.cols.min = Math.min(ranges.cols.min, Number(cellArray[1]) - 1);
    ranges.cols.max = Math.max(ranges.cols.max, Number(cellArray[1]) + 1);
  });

  return ranges;
};

const determineNeighborsAlive = (onCells, row, col) => {
  let neighborsAlive = 0;
  if (onCells.includes(`${row - 1},${col - 1}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row - 1},${col}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row - 1},${col + 1}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row},${col - 1}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row},${col + 1}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row + 1},${col - 1}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row + 1},${col}`)) { neighborsAlive ++; }
  if (onCells.includes(`${row + 1},${col + 1}`)) { neighborsAlive ++; }

  return neighborsAlive;
};

const nextGeneration = (previousOnCells) => {
  const onCells = [];
  const ranges = determineRanges(previousOnCells);

  for (let row = ranges.rows.min; row <= ranges.rows.max; row ++) {
    for (let col = ranges.cols.min; col <= ranges.cols.max; col ++) {
      const neighborsAlive = determineNeighborsAlive(previousOnCells, row, col);

      const cellAlivePreviousGeneration = previousOnCells.includes(`${row},${col}`);
      if (neighborsAlive >= 2 && neighborsAlive <= 3 && cellAlivePreviousGeneration) {
        onCells.push(`${row},${col}`);
      }

      if (neighborsAlive === 3 && !cellAlivePreviousGeneration) {
        onCells.push(`${row},${col}`);
      }
    }
  }

  return fromJS(onCells);
};

export function rows(state = numRows) {
  return state;
}

export function cols(state = numCols) {
  return state;
}

export function matrix(state = startOnCells, action = null) {
  const { type } = action;
  switch (type) {
    case ActionTypes.NEXT_GENERATION:
      return nextGeneration(state);
    default:
      // return state;
      return randomMatrix();
  }
}
