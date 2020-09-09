import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import locations from '../../../assets/locations';
import OneLevelTable from '../../data-grid/one-level/FileTable';
import TwoLevelTable from '../../data-grid/two-level/LocationTable';
import Notes from '../../notes/Notes';
import Note from '../../notes/Note';

// TODO: Add expand-all


export default function AppBody() {
  return (
    <Row>
      <Col lg={12}>
        <Tabs>
          <Tab eventKey={"one-level"} title={"One Level"}>
            <Notes>
              <Note title="One-level presentation">
                This version presents the information in a single flat table.
              </Note>
              <Note title="Sortable columns">
                The results can be sorted any Locations column.
                Click on a column heading to sort by that column.
                Click again to reverse sort order.
                Click again to remove sorting.
              </Note>
              <Note title="Column filtering">
                All results can be filtered by column.
                Controls for filtering are in each column heading.
              </Note>
              <Note title="Loading coordinates column filter">
                Click on a Coordinates cell to load the filter with
                those values. This makes it easy to search for a nearby
                location.
              </Note>
            </Notes>
            <OneLevelTable locations={locations}/>
          </Tab>
          <Tab eventKey={"two-level"} title={"Two Level"}>
            <Notes>
              <Note title="Two-level presentation">
                <p>
                  This version presents the information as a two-level table,
                  with locations as the primary table and files within a location
                  as the secondary table.
                </p>
                <p>
                  To see the files table for any given location, click on
                  the icon in the Files column.
                </p>
              </Note>
              <Note title="Sortable columns">
                The results can be sorted any column in either level of table.
                Click on a column heading to sort by that column.
                Click again to reverse sort order.
                Click again to remove sorting.
              </Note>
              <Note title="Column filtering">
                All results can be filtered by column.
                Controls for filtering are in each column heading.
              </Note>
              <Note title="Loading coordinates column filter">
                Click on a Coordinates cell to load the filter with
                those values. This makes it easy to search for a nearby
                location.
              </Note>
            </Notes>
            <TwoLevelTable locations={locations}/>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}
