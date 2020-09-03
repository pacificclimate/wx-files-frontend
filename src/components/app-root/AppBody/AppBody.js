import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import locations from '../../../assets/locations';
import { DataGrid } from '../../data-grid/DataGrid';
import SelectColumnFilter
  from '../../data-grid/column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../data-grid/column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter
  from '../../data-grid/column-filters/NumberRangeColumnFilter';


export default function AppBody() {
  const data = React.useMemo(
    () => locations.map(({ latitude, longitude, ...rest }) => ({
      coordinates: [latitude, longitude],
      ...rest,
    })),
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
        Cell: ({ value: [lat, lon] }) => `${lat}°N, ${lon}°W`,
        Filter: CoordinatesNearColumnFilter,
        filter: "coordinatesWithinRadius",
      },
      {
        Header: "Elevation",
        accessor: "elevation",
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
    ],
    []
  );

  const renderFiles = React.useCallback(
    ({ row, visibleColumns }) => (
      <tr>
        <td></td>
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
