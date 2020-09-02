import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import locations from '../../../assets/locations';
import { useFilters, useSortBy, useTable } from 'react-table';


// Custom filter UIs

// Default UI for column filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// Custom filter UI for selecting a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// Custom filter UI for selecting number within a range (min, max).
function NumberRangeColumnFilter({
 column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

// Custom UI for selecting a coordinates (lat, lon pair) near given coordinates.
function CoordinatesNearColumnFilter({
 column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseFloat(val) : undefined, old[1], old[2]])
        }}
        placeholder={`Lat (°N)`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      {', '}
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseFloat(val) : undefined, old[2]])
        }}
        placeholder={`Lon (°W)`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
      +/-
      <input
        value={filterValue[2] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], old[1], val ? parseFloat(val) : undefined])
        }}
        placeholder={`km`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
      km
    </div>
  )
}

// Custom filters

function textStartsWith(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id];
    return rowValue !== undefined
      ? String(rowValue)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase())
      : true
  });
}
textStartsWith.autoRemove = val => !val;

// Custom filter for coordinates within a bounding box defined in km.
function coordinatesInBox(rows, id, filterValue) {
  const [latCentre, lonCentre, distance] = filterValue;

  const bounds = (center, tolerance) =>
    [center - tolerance, center + tolerance];

  const inBounds = (value, [min, max]) => value >= min && value <= max;

  // approx km / deg lat at Canadian latitudes
  // (varies by < 1% from equator to pole, according to ellipsoid)
  const latTolerance = distance / 111.2;
  const latBounds = bounds(latCentre, latTolerance);

  // approx km / deg lon at specified latitude; if latitude unspecified, use
  // a default value of 55.
  const lonTolerance =
    distance / (111.32 * Math.cos((latCentre || 55.0) / 180 * Math.PI));
  const lonBounds = bounds(lonCentre, lonTolerance);

  return rows.filter(row => {
    const [latitude, longitude] = row.values[id];
    return (
      (!latCentre || inBounds(latitude, latBounds)) &&
      (!lonCentre || inBounds(longitude, lonBounds))
    );
  });
}
coordinatesInBox.autoRemove = val =>
  !val || (typeof val[0] !== 'number' && typeof val[1] !== 'number' &&
  typeof val[2] !== 'number');

// Custom filter for coordinates within a radius in km.
function coordinatesWithinRadius(rows, id, filterValue) {
  const [latCentre, lonCentre, distance] = filterValue;

  const dist = (lat1, lon1, lat2, lon2) => {
    // Compute distance between two lat-lon points using haversine formula.
    // Courtesy of http://www.movable-type.co.uk/scripts/latlong.html .
    // Cool unknown thing: Many non-ascii characters are legit in identifiers.
    const R = 6371; // km
    const d2R = Math.PI / 180;
    const φ1 = lat1 * d2R;
    const φ2 = lat2 * d2R;
    const Δφ = (lat2-lat1) * d2R;
    const Δλ = (lon2-lon1) * d2R;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  return rows.filter(row => {
    const [latitude, longitude] = row.values[id];
    return dist(latCentre, lonCentre, latitude, longitude) < distance;
  });
}
coordinatesWithinRadius.autoRemove = val =>
  !val || (typeof val[0] !== 'number' && typeof val[1] !== 'number' &&
  typeof val[2] !== 'number');


export default function AppBody() {
  const data = React.useMemo(
    () => locations.map(({ latitude, longitude, ...rest }) => ({
      coordinates: [latitude, longitude],
      ...rest,
    })),
    []
  );

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

  const columns = React.useMemo(
    () => [
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
        // id: "coordinates",
        accessor: "coordinates",
        Filter: CoordinatesNearColumnFilter,
        filter: "coordinatesWithinRadius",
      },
      // {
      //   Header: "Latitude",
      //   accessor: "latitude",
      // },
      // {
      //   Header: "Longitude",
      //   accessor: "longitude",
      // },
      {
        Header: "Elevation",
        accessor: "elevation",
        Filter: NumberRangeColumnFilter,
        filter: 'between',
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
    <Row>
      <Col lg={12}>
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
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
      </Col>
    </Row>
  );
}
