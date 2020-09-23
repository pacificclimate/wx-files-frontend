import React from 'react';
import { makeFilterNumberInputOnChange } from '../../../../utils/filters';

// Custom filter UI for selecting number within a range (min, max).

export default function NumberRangeColumnFilter({
 column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange(setFilter, 0)}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange(setFilter, 1)}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}

      />
      <button onClick={() => setFilter(undefined)}>Clear</button>
    </div>
  )
}


