import React from 'react';
import { useTable, useFilters, useSortBy, useExpanded } from 'react-table';
import Button from 'react-bootstrap/Button';

import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import compact from 'lodash/fp/compact';
import uniq from 'lodash/fp/uniq';
import capitalize from 'lodash/fp/capitalize';

import {
  coordinatesInBox, coordinatesWithinRadius, textStartsWith,
  includesIfDefined, includesInArrayOfType,

} from '../../column-filters/filterTypes';
import DefaultColumnFilter from '../../column-filters/DefaultColumnFilter';
import SelectColumnFilter from '../../column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter from
    '../../column-filters/NumberRangeColumnFilter';
import SelectArrayColumnFilter
  from '../../column-filters/SelectArrayColumnFilter';
import FileTable from '../FileTable';
import { middleDecade } from '../../../../utils/date-and-time';

import styles from './LocationTable.module.css';


const [filesExpandedIndicator, filesCollapsedIndicator] =
  ['Hide', 'Show'].map(
    v => <Button size='sm' variant='outline-primary'>{v}</Button>
  );


export default function LocationTable({ locations }) {
  const filterTypes = React.useMemo(
    () => ({
      textStartsWith,
      coordinatesInBox,
      coordinatesWithinRadius,
      includesIfDefined,
      includesInArrayOfType,
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      // TODO: This is probably not such a great default.
      filter: "textStartsWith",
    }),
    []
  );

  // Map raw locations data into the form consumed by the data grid.
  // This value and `columns` are closely allied.
  const data = React.useMemo(
    () => locations.map(
      location => {
        const { latitude, longitude, files } = location;
        return ({
          ...location,

          coordinates: [latitude, longitude],

          timePeriodDecades: flow(
            map(({ timePeriod }) => middleDecade(timePeriod)),
            compact,
            uniq,
          )(files),

          scenarios: flow(
            map('scenario'),
            compact,
            uniq,
          )(files),

          filesData: map(
            file => {
              const {
                fileType, scenario, timePeriod, ensembleStatistic, variables
              } = file;
              return {
                ...file,
                fileType: capitalize(fileType),
                scenario: scenario || '???',
                timePeriodDecade:
                  timePeriod ? `${middleDecade(timePeriod)}s` : "???",
                ensembleStatistic: ensembleStatistic || "???",
                variables: variables || "???",
              }
            }
          )(files),
        })
      }
    ),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Files",
        id: "expander",
        Cell: ({ row }) => {
          return (
            <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? filesExpandedIndicator : filesCollapsedIndicator}
          </span>
          );
        },
      },
      {
        Header: "City",
        accessor: "city",
        Filter: ({ column }) => (
          <DefaultColumnFilter size={12} column={column} />
        ),
      },
      {
        Header: "Province",
        accessor: "province",
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: "Code",
        accessor: "code",
        Filter: ({ column }) => (
          <DefaultColumnFilter size={1} column={column} />
        ),
      },
      {
        Header: "Coordinates",
        accessor: "coordinates",
        Cell: ({ value: [lat, lon] }) => `☝ ${lat}, ${lon}`,
        Filter: CoordinatesNearColumnFilter,
        filter: "coordinatesWithinRadius",
      },
      {
        Header: "Elevation",
        accessor: "elevation",
        Cell: ({ value: elevation }) => `☝ ${elevation}`,
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
      {
        Header: "Time Periods",
        accessor: "timePeriodDecades",
        Cell: ({ value }) => {
          return flow(
            map(t => `${t}s`),
            join(', '),
          )(value);
        },
        Filter: ({ column }) => (
          <SelectArrayColumnFilter
            toString={option => `${option}s`}
            column={column}
          />
        ),
        filter: includesInArrayOfType(Number),
      },
      {
        Header: "Scenarios",
        accessor: "scenarios",
        Cell: ({ value }) => value.join(', '),
        filter: "text",
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
    setFilter,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["scenarios"],
      },
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useSortBy,
    useExpanded,
  );

  // TODO: Make this a prop of the table?
  const default_coord_radius = 10;

  // TODO: For coordinates and elevation, this could be a click handler on the
  //  icon.
  const makeHandleClickCell = cell => () => {
    switch(cell.column.id) {
      case "coordinates":
        const { coordinates } = cell.row.values;
        const coord_radius =
          (cell.column.filterValue && cell.column.filterValue[2]) ||
          default_coord_radius;
        setFilter("coordinates", [...coordinates, coord_radius]);
        break;
    case "elevation":
        const { elevation } = cell.row.values;
        setFilter(
          "elevation",
          [0.9 * elevation, 1.1 * elevation].map(Math.round)
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.LocationTable}>
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
              {row.isExpanded ? (
                  <tr className={styles.expander}>
                    <td>&nbsp;</td>
                    <td colSpan={visibleColumns.length-1}>
                      <FileTable data={row.original.filesData}/>
                    </td>
                  </tr>
              ) : null}
            </React.Fragment>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}
