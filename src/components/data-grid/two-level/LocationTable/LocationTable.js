import React from 'react';
import { useTable, useFilters, useSortBy, useExpanded } from 'react-table';

import flow from 'lodash/fp/flow';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import compact from 'lodash/fp/compact';
import uniq from 'lodash/fp/uniq';
import capitalize from 'lodash/fp/capitalize';
import isString from 'lodash/fp/isString';

import {
  coordinatesInBox, coordinatesWithinRadius, textStartsWith,
  includesIfDefined, includesInArrayOfType,
} from '../../column-filters/filterTypes';
import { numeric, numericArray } from '../../sortTypes';
import DefaultColumnFilter from '../../column-filters/DefaultColumnFilter';
import SelectColumnFilter from '../../column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter from
    '../../column-filters/NumberRangeColumnFilter';
import SelectArrayColumnFilter
  from '../../column-filters/SelectArrayColumnFilter';
import FileTable from '../FileTable';
import ExpandIndicator from '../../indicators/ExpandIndicator';
import SortIndicator from '../../indicators/SortIndicator';
import { middleDecade } from '../../../../utils/date-and-time';

import styles from './LocationTable.module.css';
import SetFilterIcon from '../../misc/SetFilterIcon';


export default function LocationTable({ locations }) {
  // TODO: Extract the functions that are memoized to a different place.
  //  Several will be common to both tables.
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

  const sortTypes = React.useMemo(
    () => ({
      numeric,
      numericArray,
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
            filter({ fileType: "weather" }),
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
              const tp = timePeriod  || "???";
              return {
                ...file,
                fileType: capitalize(fileType),
                scenario: scenario || '???',
                timePeriodDecade:
                  isString(tp) ? capitalize(tp) : `${middleDecade(tp)}s`,
                ensembleStatistic: capitalize(ensembleStatistic || "???"),
                variables: capitalize(variables || "???"),
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
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            <ExpandIndicator {...row} />
          </span>
        ),
        disableSortBy: true,
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
        Cell: ({ value: [lat, lon] }) => (
          <span>
            <SetFilterIcon/> {lat}, {lon}
          </span>
        ),
        Filter: CoordinatesNearColumnFilter,
        filter: "coordinatesWithinRadius",
        sortType: 'numericArray',
      },
      {
        Header: "Elevation",
        accessor: "elevation",
        Cell: ({ value: elevation }) => (
          <span>
            <SetFilterIcon/>{elevation}
          </span>
        ),
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        sortType: 'numeric',
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
        disableSortBy: true,
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
      sortTypes,
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
