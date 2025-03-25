import React, { useState, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import filter from 'lodash/fp/filter';
import some from 'lodash/fp/some';

import { fetchWxFilesMetadata }
  from '../../../data-services/wx-files-data-service';
import Help from '../../guidance/Help';
import LocationTable from '../../data-grid/two-level/LocationTable';
import VersionControl from '../../controls/VersionControl/VersionControl';

export default function AppBody() {
  const [locations, setLocations] = useState(null);
  const [version, setVersion] = useState("CMIP6");
  const [filteredLocations, setFilteredLocations] = useState(null);

  //fetch locations
  useEffect(() => {
    fetchWxFilesMetadata().then(setLocations);
  }, []);

  useMemo(() => {
    if (locations) {
      setFilteredLocations(
        filter((location) => {
          return some(["version", version])(location.files);
        })(locations)
      );
    }
  }, [locations, version]);

  const selectVersion = (ver) => {
    setVersion(ver);
  };

  return (
    <>
      <Row>
        <Col lg={12}>
          <Help />
        </Col>
      </Row>
      <Row>
        <Col lg={3}>
          <VersionControl selected={version} onSelect={selectVersion} label={"Future-shifted Dataset"} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LocationTable locations={filteredLocations} />
        </Col>
      </Row>
    </>
  );
}
