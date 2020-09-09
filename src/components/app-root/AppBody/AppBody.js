import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import locations from '../../../assets/locations';
import TwoLevelLocationTable from '../../data-grid/two-level/LocationTable';

// TODO: Add expand-all


export default function AppBody() {
  return (
    <Row>
      <Col lg={12}>
        <TwoLevelLocationTable locations={locations}/>
      </Col>
    </Row>
  );
}
