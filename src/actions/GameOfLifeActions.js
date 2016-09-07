import { NEXT_GENERATION, START_LIFE, STOP_LIFE } from '../constants/ActionTypes';

export function nextGeneration(matrix) {
  return {
    type: NEXT_GENERATION,
    payload: {
      matrix
    }
  };
}

export function startLife() {
  return {
    type: START_LIFE
  };
}

export function stopLife() {
  return {
    type: STOP_LIFE
  };
}
