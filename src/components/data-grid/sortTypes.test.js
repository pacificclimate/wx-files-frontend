import each from 'jest-each';
import { numericArray } from './sortTypes';


const makeRow = (columnId, value) => {
  return {
    values: {
      [columnId]: value,
    }
  }
};


describe('numericArray', () => {
  each([
    ['id1', [0], [0], 0],
    ['id1', [2], [2], 0],
    ['id1', [0], [1], -1],
    ['id1', [1], [0], 1],

    ['id1', [2, 2], [2, 2], 0],

    ['id1', [2, 2], [3, 1], -1],
    ['id1', [2, 2], [3, 2], -1],
    ['id1', [2, 2], [3, 3], -1],

    ['id1', [4, 2], [3, 1], 1],
    ['id1', [4, 2], [3, 2], 1],
    ['id1', [4, 2], [3, 3], 1],

    ['id1', [2, 2], [2, 3], -1],
    ['id1', [2, 3], [2, 2], 1],
  ]).test('%p %p %p', (columnId, aValue, bValue, expected) => {
    const rowA = makeRow(columnId, aValue);
    const rowB = makeRow(columnId, bValue);
    const comparison = numericArray(rowA, rowB, columnId);
    expect(comparison).toBe(expected);
  });
});
