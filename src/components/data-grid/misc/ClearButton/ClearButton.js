import React from 'react';
import { XCircle } from 'react-bootstrap-icons';
import styles from './ClearButton.module.css';


export default function ClearButton(props) {
  return (
    <XCircle
      className={styles.ClearButton}
      {...props}
    />
  );
}
