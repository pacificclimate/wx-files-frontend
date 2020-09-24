import React from 'react';

// Custom filter UI for selecting a unique option from a list that contains
// an array of option values. (Typically this array coalesces information about
// a list of sub-objects associated with the row.)

export default function SelectArrayColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  toString = option => option.toString(),
}) {
  // Calculate the options for filtering using the preFilteredRows.
  // The row values themselves are arrays, and each array element is added
  // to the list of options.
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      row.values[id].forEach(value => {
        options.add(value);
      });
    });
    return [...options.values()];
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {toString(option)}
        </option>
      ))}
    </select>
  );
}


