import React from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';

import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import groupBy from 'lodash/fp/groupBy';
import capitalize from 'lodash/fp/capitalize';

import { mapWithKey } from '../../../../utils/lodash-fp-extras';
import { middleDecade } from '../../../../utils/date-and-time';

import {
  coordinatesWithinRadius,
  textStartsWith
} from '../../column-filters/filterTypes';
import DefaultColumnFilter from '../../column-filters/DefaultColumnFilter';
import SelectColumnFilter from '../../column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter
  from '../../column-filters/NumberRangeColumnFilter';

import styles from './FileTable.module.css';


export default function FileTable({ locations }) {
  const filterTypes = React.useMemo(
    () => ({
      textStartsWith,
      coordinatesWithinRadius,
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
    () => {
      return flow(
        map(location => {
          const { latitude, longitude, files } = location;
          const locationData = {
            ...location,
            coordinates: [latitude, longitude],
          };

          return mapWithKey((file, index) => {
            const {
              fileType, scenario, timePeriod, ensembleStatistic, variables
            } = file;

            return {
              location: locationData,
              file: {
                ...file,
                index,
                fileType: capitalize(fileType),
                scenario: scenario || '???',
                timePeriodDecade:
                  timePeriod ? `${middleDecade(timePeriod)}s` : "???",
                ensembleStatistic: ensembleStatistic || "???",
                variables: variables || "???",
              }
            };
          }, files);
        }),

        flatten,
      )(locations)
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Location",
        columns: [
          {
            Header: "City",
            accessor: "location.city",
          },
          {
            Header: "Province",
            accessor: "location.province",
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: "Code",
            accessor: "location.code",
          },
          {
            Header: "Coordinates",
            accessor: "location.coordinates",
            Cell: ({ value: [lat, lon] }) => `☝ ${lat}°N, ${lon}°W`,
            Filter: CoordinatesNearColumnFilter,
            filter: "coordinatesWithinRadius",
          },
          {
            Header: "Elevation",
            accessor: "location.elevation",
            Filter: NumberRangeColumnFilter,
            filter: 'between',
          },
        ],
      },
      {
        Header: "Files",
        columns: [
          {
            Header: "Type",
            accessor: "file.fileType",
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: "Scenario",
            accessor: "file.scenario",
            Filter: SelectColumnFilter,
            filter: 'includesIfDefined',
          },
          {
            Header: "Time Period",
            accessor: "file.timePeriodDecade",
            Filter: SelectColumnFilter,
            filter: 'includesIfDefined',
          },
          {
            Header: "Ensemble Statistic",
            accessor: "file.ensembleStatistic",
            Filter: SelectColumnFilter,
            filter: 'includesIfDefined',
          },
          {
            Header: "Variables",
            accessor: "file.variables",
            Filter: SelectColumnFilter,
            filter: 'includesIfDefined',
          },
          {
            Header: "Download",
            accessor: "file.contentUri",
            disableFilters: true,
            Cell: ({ value }) => (
              <a href={"#"} title={value}>Download</a>
            )
          },
        ],
      }

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
  } = useTable(
    { columns, data, defaultColumn, filterTypes, },
    useFilters,
    useSortBy,
  );

  const makeHandleClickCell = cell => () => {
    switch(cell.column.id) {
      case "location.coordinates":
        setFilter(
          "location.coordinates",
          [...cell.row.values['location.coordinates'], 100]
        );
        break;
      default:
        break;
    }
  }

  console.log('\n### rows', rows)

  // Group rows by location, so that the number of files for each location,
  // after filtering, can be determined.
  const rowsByLocationId = groupBy('original.location.id')(rows);

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
        {mapWithKey((row, rowIndex) => {
          // There is a value `row.index`, but it does not reflect row
          // filtering. We need the index within the set of filtered rows.
          // Hence `rowIndex`.
          prepareRow(row)
          return (
            <React.Fragment {...row.getRowProps()} >
              <tr>
                {row.cells.map(cell => {
                  if (cell.column.parent.id === 'Location') {
                    // For location columns, return a <td> only for the first
                    // cell. That <td> spans all the rows with that location.
                    return (
                      rowIndex === 0 || (
                        row.original.location !==
                        rows[rowIndex-1].original.location
                      )
                    ) && (
                      <td
                        rowSpan={
                          rowsByLocationId[row.original.location.id].length
                        }
                        {...cell.getCellProps()}
                        onClick={makeHandleClickCell(cell)}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  // For file columns, always return a normal <td>.
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
            </React.Fragment>
          )
        })(rows)}
        </tbody>
      </table>
    </div>
  );
}
