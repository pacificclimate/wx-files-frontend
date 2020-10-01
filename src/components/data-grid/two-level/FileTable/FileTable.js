import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useFilters, useSortBy, useTable } from 'react-table';
import { textStartsWith } from '../../column-filters/filterTypes';

import styles from './FileTable.module.css';
import SortIndicator from '../../indicators/SortIndicator';
import { fileContentUri } from '../../../../data-services/wx-files-data-service';


export default function FileTable({ data }) {
  const filterTypes = React.useMemo(
    () => ({
      textStartsWith,
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      disableFilters: true,
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "fileType",
      },
      {
        Header: "Scenario",
        accessor: "scenario",
      },
      {
        Header: "Time Period",
        accessor: "timePeriodDecade",
      },
      {
        Header: "Ensemble Statistic",
        accessor: "ensembleStatistic",
      },
      {
        Header: "Variables",
        accessor: "variables",
      },
      {
        Header: "Download",
        accessor: "contentUri",
        disableFilters: true,
        Cell: ({ value }) => (
          <Button
            href={fileContentUri(value)}
            size='sm'
            variant='outline-primary'
          >
            Download
          </Button>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data, defaultColumn, filterTypes, },
    useFilters,
    useSortBy,
  );

  return (
    <div className={styles.FileTable}>
      <Table
        {...getTableProps()}
      >
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                title={""}
              >
                <div
                  title={column.canSort ? "Click to change column sorting" : ""}
                >
                  {column.render('Header')}
                  {' '}
                  {column.canSort && <SortIndicator {...column}/>}
                </div>
                {
                  column.canFilter &&
                  <div
                    title="Filter rows"
                    onClick={e => e.stopPropagation()}
                  >
                    {column.render('Filter')}
                  </div>
                }
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  );
}
