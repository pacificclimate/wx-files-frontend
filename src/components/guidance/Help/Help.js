import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Notes from '../../notes/Notes';
import Note from '../../notes/Note';
import ClearButton from '../../data-grid/misc/ClearButton';
import FavouriteIndicator from '../../data-grid/indicators/FavouriteIndicator';


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
              <Note title="Pagination">
                The locations available (selected by filtering, if you use it)
                are presented in pages of a few locations at a time.
                Since most users want to narrow down to a small
                number of locations using the filters and sorting, pagination
                should be beneficial, eliminating clutter and delays in
                presenting a long list of irrelevant results.
                You can select how many locations constitute a page;
                the default is 15.
                If you wish to see other pages of filtered
                locations, use the pagination controls at the top and bottom
                of the locations table.
              </Note>
              <Note title="Favourites">
                Many users are interested in only a few locations.
                If you wish, you can mark any location as a favourite
                by clicking <FavouriteIndicator/> in its row.
                That location will be stored locally in your browser as a
                favourite, and its indicator will change
                to <FavouriteIndicator favourite={true}/>.
                To show only your local favourites, click
                the <FavouriteIndicator/> in the column header.
                To show all locations again,
                click <FavouriteIndicator favourite={true}/> in the
                column header.
                Note: No one else can see or use your favourites list.
                If you use a different computer or browser, you will have
                a different favourites list.
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
