import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import locations from '../../../assets/locations';
import LocationTable from '../../data-grid/LocationTable';

// TODO: Add expand-all


export default function AppBody() {
  return (
    <Row>
      <Col lg={12}>
        <LocationTable locations={locations}/>
      </Col>
    </Row>
  );
}
