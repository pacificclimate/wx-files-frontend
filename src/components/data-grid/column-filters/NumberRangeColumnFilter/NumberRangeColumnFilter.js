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
        className={styles.control}
        size="sm"
        type="number"
        value={filterValue[0] || ''}
        onChange={makeFilterNumberInputOnChange({ filterValue, setFilter }, 0)}
        placeholder={'Min'}
      />
      to
      <Form.Control
        className={styles.control}
        style={{
          marginLeft: '0.5em',
        }}
        size="sm"
        type="number"
        value={filterValue[1] || ''}
        onChange={makeFilterNumberInputOnChange({ filterValue, setFilter }, 1)}
        placeholder={'Max'}
      />
      <ClearButton setFilter={setFilter} />
    </div>
  );
}


