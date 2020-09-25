import React from 'react';
import Button from 'react-bootstrap/cjs/Button';
import { useFilters, useSortBy, useTable } from 'react-table';
import { textStartsWith } from '../../column-filters/filterTypes';

import styles from './FileTable.module.css';
import SortIndicator from '../../indicators/SortIndicator';


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
          <Button href={value} size='sm' variant='outline-primary'>
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
      <table
        {...getTableProps()}
      >
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                {' '}
                <SortIndicator {...column}/>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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
      </table>
    </div>
  );
}
