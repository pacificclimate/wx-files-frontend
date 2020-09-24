import React from 'react';

// Custom filter UI for selecting a unique option from a list

export default function SelectArrayColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
  toString = option => option.toString(),
}) {
  // Calculate the options for filtering using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      // console.log('### row values', row.values[id])
      // options.add(row.values[id])
      row.values[id].forEach(value => options.add(value))
    })
    return [...options.values()]
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
  )
}


