import React from 'react';
import Form from 'react-bootstrap/Form';
import ClearButton from '../../misc/ClearButton';

// Custom filter UI for selecting a unique option from a list that contains
// an array of option values. (Typically this array coalesces information about
// a list of sub-objects associated with the row.)

export default function SelectArrayColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  toString = option => option.toString(),
  allValue = "*",
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
    <div style={{ display: 'flex' }}>
      <Form.Control
        as="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        size="sm"
      >
        <option value={allValue}>All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {toString(option)}
          </option>
        ))}
      </Form.Control>
      <ClearButton setFilter={() => setFilter(allValue)} />
    </div>
  );
}


