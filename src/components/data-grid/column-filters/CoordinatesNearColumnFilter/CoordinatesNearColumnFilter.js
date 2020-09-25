import React from 'react';
import { makeFilterNumberInputOnChange} from '../../../../utils/filters';
import ClearButton from '../../misc/ClearButton';

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
        onChange={makeFilterNumberInputOnChange(setFilter, 0)}
        placeholder={`Lat`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange(setFilter, 1)}
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
        step={5}
        onChange={makeFilterNumberInputOnChange(setFilter, 2)}
        placeholder={`km`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
      km
      <ClearButton
        onClick={e => {
          e.stopPropagation();
          setFilter(undefined);
        }}
      />
    </div>
  )
}
