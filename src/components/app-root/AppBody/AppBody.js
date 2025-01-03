import React, { useState, useEffect } from 'react';
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

  const filterLocations = (ver) => {
	// don't respond to dropdown selections until locations are loaded
	if (locations) {
    	setFilteredLocations(
	    	filter((location) => {
		    	return some(["version", ver])(location.files);
		  })(locations)
	  );
	}
  };

  const selectVersion = (ver) => {
	setVersion(ver);
	filterLocations(ver);
  };

  //fetch locations
  useEffect(() => {
    fetchWxFilesMetadata().then(setLocations);
  }, []);

  // set initial filtered locations
  useEffect(() => {
	if(locations && !filteredLocations){
		filterLocations(version);
	}
  }, [locations]);

  return (
    <>
      <Row>
        <Col lg={12}>
          <Help/>
        </Col>
      </Row>
	  <Row>
	    <Col lg={3}>
    	    <VersionControl selected={version} onSelect={selectVersion} label={"Future-shifted Dataset"}/>
		</Col>
	  </Row>
      <Row>
        <Col lg={12}>
          <LocationTable locations={filteredLocations}/>
        </Col>
      </Row>
    </>
  );
}
