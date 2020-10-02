import React from 'react';
import Form from 'react-bootstrap/Form';
import { makeFilterNumberInputOnChange } from '../../../../utils/filters';
import ClearButton from '../../misc/ClearButton';
import styles from '../ColumnFilters.module.css';

// Custom filter UI for selecting number within a range (min, max).

export default function NumberRangeColumnFilter({
 column: {
   filterValue = [undefined, undefined],
   setFilter,
 },
}) {
  return (
    <div className={`${styles.wrapper} ${styles.numberRange}`}>
      <Form.Control
        value={filterValue[0] || ''}
        type="number"
        onChange={makeFilterNumberInputOnChange({ filterValue, setFilter }, 0)}
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
        onChange={makeFilterNumberInputOnChange({ filterValue, setFilter }, 1)}
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


