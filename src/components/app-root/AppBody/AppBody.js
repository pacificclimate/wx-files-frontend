import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';
import join from 'lodash/fp/join';
import uniq from 'lodash/fp/uniq';

import locations from '../../../assets/locations';
import { DataGrid } from '../../data-grid/DataGrid';
import SelectColumnFilter
  from '../../data-grid/column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../data-grid/column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter
  from '../../data-grid/column-filters/NumberRangeColumnFilter';

// TODO: div-based rendering (not table)
// TODO: Styling
// TODO: Fix bad factorization of DataGrid and AppBody
// TODO: Implement expander for files as a react-table component

export default function AppBody() {
  const data = React.useMemo(
    () => locations.map(
      location => {
        const { latitude, longitude, files } = location;
        return ({
          ...location,

          coordinates: [latitude, longitude],

          timePeriods: flow(
            map(({ timePeriod }) => {
              if (!timePeriod) {
                return null;
              }
              const startYear = timePeriod.start.getFullYear();
              const endYear = timePeriod.end.getFullYear();
              return Math.floor((startYear + endYear) / 20) * 10;
            }),
            compact,
            uniq,
          )(files),

          scenarios: flow(
            map('scenario'),
            compact,
            uniq,
          )(files),
        })
      }
    ),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: false,
        id: "expander",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
      {
        Header: "City",
        accessor: "city",
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
      },
      {
        Header: "Coordinates",
        accessor: "coordinates",
        Cell: ({ value: [lat, lon] }) => `☝ ${lat}°N, ${lon}°W`,
        Filter: CoordinatesNearColumnFilter,
        filter: "coordinatesWithinRadius",
      },
      {
        Header: "Elevation",
        accessor: "elevation",
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
      {
        Header: "Time Periods",
        accessor: "timePeriods",
        Cell: ({ value }) => {
          console.log('### timePeriods column', value)
          return flow(
            map(t => `${t}s`),
            join(', '),
          )(value);
        },
        filter: 'text',
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

  const renderFiles = React.useCallback(
    ({ row, visibleColumns }) => (
      <tr>
        <td>&nbsp;</td>
        <td colSpan={visibleColumns.length-1}>
          'Files'
        </td>
      </tr>
    )
  )

  return (
    <Row>
      <Col lg={12}>
        <DataGrid
          columns={columns}
          data={data}
          renderRowExpansion={renderFiles}
        />
      </Col>
    </Row>
  );
}
