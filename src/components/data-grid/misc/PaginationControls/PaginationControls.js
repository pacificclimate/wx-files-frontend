import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
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
      <ButtonToolbar>
        <ButtonGroup className={styles.fwdBack}>
          <Button
            title="Go to first page"
            {...buttonProps}
            onClick={() => gotoPage(0)}
          >
            <SkipBackward/>
          </Button>
          <Button
            title="Go to previous page"
            {...buttonProps}
            disabled={!canPreviousPage}
            onClick={previousPage}
          >
            <SkipStart/>
          </Button>
          <Button
            {...buttonProps}
            variant={'outline-dark'}
            disabled
          >
            Page {pageIndex + 1} of {pageCount}
          </Button>
          <Button
            title="Go to next page"
            {...buttonProps}
            disabled={!canNextPage}
            onClick={nextPage}
          >
            <SkipEnd/>
          </Button>
          <Button
            title="Go to last page"
            {...buttonProps}
            onClick={() => gotoPage(pageCount - 1)}
          >
            <SkipForward/>
          </Button>
        </ButtonGroup>
        <InputGroup
          className={styles.perPage}
          size={size}
        >
          <InputGroup.Prepend>
            <InputGroup.Text>Show</InputGroup.Text>
          </InputGroup.Prepend>
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
          <InputGroup.Append>
            <InputGroup.Text>locations per page</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </ButtonToolbar>
  );
}
