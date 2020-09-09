import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import locations from '../../../assets/locations';
import OneLevelTable from '../../data-grid/one-level/FileTable';
import TwoLevelTable from '../../data-grid/two-level/LocationTable';

// TODO: Add expand-all


export default function AppBody() {
  return (
    <Row>
      <Col lg={12}>
        <Tabs>
          <Tab eventKey={"one-level"} title={"One Level"}>
            <OneLevelTable locations={locations}/>
          </Tab>
          <Tab eventKey={"two-level"} title={"Two Level"}>
            <TwoLevelTable locations={locations}/>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}
