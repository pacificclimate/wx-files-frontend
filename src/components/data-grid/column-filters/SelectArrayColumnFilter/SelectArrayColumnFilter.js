import React, {useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import ClearButton from '../../misc/ClearButton';
import styles from '../ColumnFilters.module.css';
import {useStore} from '../../../../hooks/useZustandStore';

// Custom filter UI for selecting a unique option from a list that contains
// an array of option values. (Typically this array coalesces information about
// a list of sub-objects associated with the row.)

export default function SelectArrayColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  toString = option => option.toString(),
  allValue = "*",
}) {
  const registerFilter = useStore.getState().registerFilter;

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

  // register this filter so it can be used by other UI elements
  // only needs to be done once.
  useEffect(() => {
	  registerFilter(id, "list", setFilter, options? options : {});
  }, [options]);

  // Render a multi-select box
  return (
    <div className={`${styles.wrapper} ${styles.selectArrayColumn}`}>
      <Form.Control
        size="sm"
        as="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
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


