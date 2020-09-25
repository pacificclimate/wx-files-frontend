import React from 'react';
import Form from 'react-bootstrap/Form';
import ClearButton from '../../misc/ClearButton';

// Default UI for column filtering
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
  size,
}) {
  const count = preFilteredRows.length

  return (
    <div style={{ display: 'flex' }}>
      <Form.Control
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        htmlSize={size}
        size="sm"
      />
      <ClearButton setFilter={setFilter} />
    </div>
  );
}


