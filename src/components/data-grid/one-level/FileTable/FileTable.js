import React from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';
import {
  coordinatesWithinRadius,
  textStartsWith
} from '../../column-filters/filterTypes';
import DefaultColumnFilter from '../../column-filters/DefaultColumnFilter';
import SelectColumnFilter from '../../column-filters/SelectColumnFilter';

import styles from './FileTable.module.css';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import { middleDecade } from '../../../../utils/date-and-time';
import compact from 'lodash/fp/compact';
import uniq from 'lodash/fp/uniq';
import capitalize from 'lodash/fp/capitalize';
import CoordinatesNearColumnFilter
  from '../../column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter
  from '../../column-filters/NumberRangeColumnFilter';


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

          return map(file => {
            const {
              fileType, scenario, timePeriod, ensembleStatistic, variables
            } = file;

            return {
              location: locationData,
              file: {
                ...file,
                fileType: capitalize(fileType),
                scenario: scenario || '???',
                timePeriodDecade:
                  timePeriod ? `${middleDecade(timePeriod)}s` : "???",
                ensembleStatistic: ensembleStatistic || "???",
                variables: variables || "???",
              }
            };
          })(files);
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
            Cell: ({ value }) => (<a href={"#"}>Download ({value})</a>)
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
          console.log("### 1 location row", row)
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
            </React.Fragment>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}
