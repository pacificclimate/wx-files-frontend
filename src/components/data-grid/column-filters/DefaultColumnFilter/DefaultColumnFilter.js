import React from 'react';
import Form from 'react-bootstrap/Form';
import ClearButton from '../../misc/ClearButton';
import styles from '../ColumnFilters.module.css';

// Default UI for column filtering
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
  size,
}) {
  const count = preFilteredRows.length

  return (
    <div className={`${styles.wrapper} ${styles.default}`}>
      <Form.Control
        size="sm"
        htmlSize={size}
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
      <ClearButton setFilter={setFilter} />
    </div>
  );
}


