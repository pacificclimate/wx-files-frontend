import React from 'react';


// Custom UI for selecting a coordinates (lat, lon pair) near given coordinates.

export default function CoordinatesNearColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1], old[2]])
        }}
        placeholder={`Lat`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      {', '}
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined, old[2]])
        }}
        placeholder={`Lon`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
      +/-
      <input
        value={filterValue[2] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], old[1], val ? parseFloat(val) : undefined])
        }}
        placeholder={`km`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
      km
      <button onClick={() => setFilter(undefined)}>Clear</button>
    </div>
  )
}
