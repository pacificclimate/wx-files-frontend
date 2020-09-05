import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  coordinatesInBox, coordinatesWithinRadius, textStartsWith
} from '../column-filters/filterTypes';
import DefaultColumnFilter from '../column-filters/DefaultColumnFilter';
import { useTable, useFilters, useSortBy, useExpanded } from 'react-table';


export function DataGrid({ columns, data, renderRowExpansion}) {
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

  const makeHandleClickRow = row => () => {
    setFilter("coordinates", [...row.values.coordinates, 100]);
  }

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
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
      {headerGroups.map(headerGroup => (
        <>
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
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
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        </>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <React.Fragment {...row.getRowProps()} >
            <tr>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
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
    </table>
  );
}
