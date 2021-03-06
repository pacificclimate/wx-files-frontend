import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { fetchWxFilesMetadata }
  from '../../../data-services/wx-files-data-service';
import Help from '../../guidance/Help';
import LocationTable from '../../data-grid/two-level/LocationTable';


export default function AppBody() {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    fetchWxFilesMetadata().then(setLocations);
  }, []);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Help/>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LocationTable locations={locations}/>
        </Col>
      </Row>
    </>
  );
}
