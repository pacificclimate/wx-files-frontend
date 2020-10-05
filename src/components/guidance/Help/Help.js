import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Notes from '../../notes/Notes';
import Note from '../../notes/Note';
import ClearButton from '../../data-grid/misc/ClearButton';


export default function Help() {
  return (
    <Accordion>
      <Card border={'light'}>
        <Card.Header>
          <Accordion.Toggle
            eventKey={"0"}
            as={({ children, ...props }) => (
              <Button
                size="sm"
                variant="outline-dark"
                {...props}
              >
                {children}
              </Button>
            )}
          >
            Help
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"0"}>
          <Card.Body>
            <Notes>
              <Note title="Two-level presentation">
                Weather files information is presented as a two-level table,
                with locations in the primary table and weather files for each a location
                in a subsidiary table.
                To show or hide the files table for any given location, click on
                the button in the Files column.
              </Note>
              <Note title="Sortable columns">
                Table rows can be sorted on any column.
                Click on a column heading to sort by that column.
                Click again to reverse sort order.
                Click again to remove sorting.
              </Note>
              <Note title="Column filtering">
                Table rows can be filtered by column.
                Controls for filtering are in each column heading.
                The
                <ClearButton
                  title="Example"
                  setFilter={() => {}}
                  style={{ marginRight: "0.5em" }}
                />
                button clears the contents of the filter
                (removing that filtering).
              </Note>
              <Note title="Loading column filters from row contents">
                Coordinates and Elevation column filters can be loaded with
                the data in a cell by clicking on that cell. This makes it easy
                to search for a location with similar values.
              </Note>
              <Note title="Contextual help">
                Most of the above help information shows as pop-ups
                when you hover over the relevant item. For example,
                hover over a column heading or filter.
              </Note>
            </Notes>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}