import React from 'react';
import { XCircle } from 'react-bootstrap-icons';
import styles from './ClearButton.module.css';


export default function ClearButton({
  title = "Clear filter values",
  setFilter,
  ...restProps
}) {
  return (
    <div title={title}>
      <XCircle
        className={styles.ClearButton}
        onClick={e => {
          e.stopPropagation();
          setFilter(undefined);
        }}
        {...restProps}
      />
    </div>
  );
}
