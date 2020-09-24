import flow from 'lodash/fp/flow';
import dropWhile from 'lodash/fp/dropWhile';
import zipAll from 'lodash/fp/zipAll';


function getRowValueByColumnID(row, columnId) {
  return row.values[columnId]
}


export const numeric = (rowA, rowB, columnId) => {
  let a = getRowValueByColumnID(rowA, columnId);
  let b = getRowValueByColumnID(rowB, columnId);
  return a === b ? 0 : a > b ? 1 : -1;
};


export const numericArray = (rowA, rowB, columnId) => {
  let as = getRowValueByColumnID(rowA, columnId);
  let bs = getRowValueByColumnID(rowB, columnId);
  return flow(
    zipAll,
    dropWhile(([a, b]) => a === b),
    ([a, b]) => a > b ? 1 : -1,
  )([as, bs]);
};
