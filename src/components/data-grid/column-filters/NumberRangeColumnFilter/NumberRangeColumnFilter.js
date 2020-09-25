import React from 'react';
import Form from 'react-bootstrap/Form';
import { makeFilterNumberInputOnChange } from '../../../../utils/filters';
import ClearButton from '../../misc/ClearButton';

// Custom filter UI for selecting number within a range (min, max).

export default function NumberRangeColumnFilter({
 column: { filterValue = [], setFilter, id },
}) {
  return (
    <div style={{ display: 'flex' }}>
      <Form.Control
        value={filterValue[0] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange(setFilter, 0)}
        placeholder={'Min'}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
        size="sm"
      />
      to
      <Form.Control
        value={filterValue[1] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange(setFilter, 1)}
        placeholder={'Max'}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
        size="sm"
      />
      <ClearButton setFilter={setFilter} />
    </div>
  );
}


