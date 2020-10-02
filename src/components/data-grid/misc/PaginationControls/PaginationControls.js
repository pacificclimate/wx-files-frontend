import React from 'react';
import Button from 'react-bootstrap/cjs/Button';
import {
  SkipBackward, SkipEnd, SkipForward, SkipStart
} from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import styles from './PaginationControl.module.css';


export default function PaginationControls({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  previousPage,
  pageSize,
  setPageSize,
  pageSizes = [10, 15, 20, 30],
  size = 'sm',
  variant = 'outline-primary'
}) {
  const buttonProps = { size, variant };
  return (
    <div className={styles.PaginationControl}>
      <Button
        {...buttonProps}
        onClick={() => gotoPage(0)}
      >
        <SkipBackward/>
      </Button>
      <Button
        {...buttonProps}
        disabled={!canPreviousPage}
        onClick={previousPage}
      >
        <SkipStart/>
      </Button>
      <span className={styles.group}>
        Page {pageIndex + 1} of {pageCount}
      </span>
      <Button
        {...buttonProps}
        disabled={!canNextPage}
        onClick={nextPage}
      >
        <SkipEnd/>
      </Button>
      <Button
        {...buttonProps}
        onClick={() => gotoPage(pageCount - 1)}
      >
        <SkipForward/>
      </Button>
      <span className={styles.group}>
        Show
        <Form.Control
          className={`text-primary ${styles.perPage}`}
          size={size}
          as="select"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {
            pageSizes.map(pgSize => (
                <option key={pgSize} value={pgSize}>
                   {pgSize}
                </option>
            ))
          }
        </Form.Control>
        locations per page
      </span>
    </div>
  );
}
