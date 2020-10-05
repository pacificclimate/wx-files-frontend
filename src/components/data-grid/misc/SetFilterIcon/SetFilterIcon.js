import React from 'react';
import { Upload } from 'react-bootstrap-icons';
import styles from './SetFilterIcon.module.css';

export default function SetFilterIcon({
  title = "Click to load cell value into filter",
  ...restProps
}) {
  return (
    <span title={title}>
      <Upload
        className={`${styles.SetFilterIcon} text-primary`}
        {...restProps}
      />
    </span>
  );
}
