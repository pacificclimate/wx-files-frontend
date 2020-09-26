import React from 'react';
import Form from 'react-bootstrap/Form';
import ClearButton from '../../misc/ClearButton';
import styles from '../ColumnFilters.module.css';

// Custom filter UI for selecting a unique option from a list

export default function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  allValue = "*",
}) {
  // Calculate the options for filtering using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <div className={`${styles.wrapper} ${styles.selectColumn}`}>
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
            {option}
          </option>
        ))}
      </Form.Control>
      <ClearButton setFilter={() => setFilter(allValue)} />
    </div>
  );
}


