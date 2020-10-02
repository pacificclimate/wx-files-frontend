import flow from 'lodash/fp/flow';
import dropWhile from 'lodash/fp/dropWhile';
import zipAll from 'lodash/fp/zipAll';
import head from 'lodash/fp/head';


function getRowValueByColumnID(row, columnId) {
  return row.values[columnId]
}


// Numeric comparator
export const numeric = (rowA, rowB, columnId) => {
  let a = getRowValueByColumnID(rowA, columnId);
  let b = getRowValueByColumnID(rowB, columnId);
  return a === b ? 0 : a > b ? 1 : -1;
};


// Numeric array comparator. Compares using lexicographic ordering:
// Decision is made on values at first index where arrays differ. If no
// difference, they are equal.
export const numericArray = (rowA, rowB, columnId) => {
  let as = getRowValueByColumnID(rowA, columnId);
  let bs = getRowValueByColumnID(rowB, columnId);
  return flow(
    zipAll,
    dropWhile(([a, b]) => a === b),
    head,
    (crux) => {
      if (!crux) {
        return 0;
      }
      const [a, b] = crux;
      return a > b ? 1 : -1
    },
  )([as, bs]);
};
