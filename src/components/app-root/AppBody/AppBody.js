import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/fp/map';
import locations from '../../../assets/locations';
import { useTable } from 'react-table';


export default function AppBody() {
  const data = React.useMemo(() => locations, []);

  const columns = React.useMemo(
    () => [
      { Header: "City", accessor: "city" },
      { Header: "Province", accessor: "province" },
      { Header: "Code", accessor: "code" },
      { Header: "Latitude", accessor: "latitude" },
      { Header: "Longitude", accessor: "longitude" },
      { Header: "Elevation", accessor: "elevation" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Row>
      <Col lg={12}>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
          <thead>
          {headerGroups.map(headerGroup => (
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
                  {column.render('Header')}
                </th>
              ))}
            </tr>
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
