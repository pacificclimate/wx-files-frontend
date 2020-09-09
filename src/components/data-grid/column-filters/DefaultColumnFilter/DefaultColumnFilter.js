import React from 'react';

// Default UI for column filtering
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
  size,
}) {
  const count = preFilteredRows.length

  return (
    <input
      size={size || 10}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}


