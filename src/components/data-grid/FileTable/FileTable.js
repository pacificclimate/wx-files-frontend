import React from 'react';
import { textStartsWith } from '../column-filters/filterTypes';
import DefaultColumnFilter from '../column-filters/DefaultColumnFilter';
import { useFilters, useSortBy, useTable } from 'react-table';
import styles from '../FileTable/FileTable.module.css';
import SelectColumnFilter from '../column-filters/SelectColumnFilter';


export default function FileTable({ data }) {
  const filterTypes = React.useMemo(
    () => ({
      textStartsWith,
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: "textStartsWith",
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "fileType",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: "Scenario",
        accessor: "scenario",
        Filter: SelectColumnFilter,
        filter: 'includesIfDefined',
      },
      {
        Header: "Time Period",
        accessor: "timePeriodDecade",
        Filter: SelectColumnFilter,
        filter: 'includesIfDefined',
      },
      {
        Header: "Ensemble Statistic",
        accessor: "ensembleStatistic",
        Filter: SelectColumnFilter,
        filter: 'includesIfDefined',
      },
      {
        Header: "Variables",
        accessor: "variables",
        Filter: SelectColumnFilter,
        filter: 'includesIfDefined',
      },
      {
        Header: "Download",
        accessor: "contentUri",
        disableFilters: true,
        Cell: ({ value }) => (<a href={"#"}>Download ({value})</a>)
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
          <>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
                </th>
              ))}
            </tr>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          </>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          console.log("### file row", row)
          prepareRow(row)
          return (
            <React.Fragment {...row.getRowProps()} >
              <tr>
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
            </React.Fragment>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}
