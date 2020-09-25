import React from 'react';
import Form from 'react-bootstrap/Form';
import { makeFilterNumberInputOnChange} from '../../../../utils/filters';
import ClearButton from '../../misc/ClearButton';
import styles from '../ColumnFilters.module.css';

// Custom UI for selecting a coordinates (lat, lon pair) near given coordinates.

export default function CoordinatesNearColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  return (
    <div className={`${styles.wrapper} ${styles.coordinates}`}>
      <Form.Control
        className={styles.control}
        size="sm"
        htmlSize={6}
        value={filterValue[0] || ''}
        onChange={makeFilterNumberInputOnChange(setFilter, 0)}
        placeholder={`Lat`}
      />
      <Form.Control
        className={styles.control}
        size="sm"
        htmlSize={6}
        value={filterValue[1] || ''}
        onChange={makeFilterNumberInputOnChange(setFilter, 1)}
        placeholder={`Lon`}
      />
      ±
      <Form.Control
        className={`${styles.control} ${styles.radius}`}
        size="sm"
        htmlSize={4}
        value={filterValue[2] || ''}
        type="number"
        step={5}
        onChange={makeFilterNumberInputOnChange(setFilter, 2)}
        placeholder={`km`}
        style={{
          marginLeft: '0.5em',
        }}
      />
      km
      <ClearButton setFilter={setFilter} />
    </div>
  )
}
