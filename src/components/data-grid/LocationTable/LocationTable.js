import React from 'react';
import Table from 'react-bootstrap/Table';
import {
  coordinatesInBox, coordinatesWithinRadius, textStartsWith
} from '../column-filters/filterTypes';
import DefaultColumnFilter from '../column-filters/DefaultColumnFilter';
import { useTable, useFilters, useSortBy, useExpanded } from 'react-table';
import styles from './LocationTable.module.css';


export default function LocationTable({ columns, data, renderRowExpansion}) {
  const filterTypes = React.useMemo(
    () => ({
      textStartsWith,
      coordinatesInBox,
      coordinatesWithinRadius,
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    visibleColumns,
  } = useTable(
    { columns, data, defaultColumn, filterTypes, },
    useFilters,
    useSortBy,
    useExpanded,
  );

  // TODO: For coordinates, at least, this could be a click handler on the
  // icon.
  const makeHandleClickCell = cell => () => {
    switch(cell.column.id) {
      case "coordinates":
        setFilter("coordinates", [...cell.row.values.coordinates, 100]);
        break;
      default:
        break;
    }
    // console.log('### makeHandleClickCell', cell);
  }

  return (
    <div className={styles.LocationTable}>
      <Table
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
          console.log("### location row", row)
          prepareRow(row)
          return (
            <React.Fragment {...row.getRowProps()} >
              <tr>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      onClick={makeHandleClickCell(cell)}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
              {row.isExpanded ? renderRowExpansion({ row, visibleColumns }) : null}
            </React.Fragment>
          )
        })}
        </tbody>
      </Table>
    </div>
  );
}
