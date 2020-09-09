import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';
import join from 'lodash/fp/join';
import uniq from 'lodash/fp/uniq';
import capitalize from 'lodash/fp/capitalize';

import locations from '../../../assets/locations';
import LocationTable from '../../data-grid/LocationTable';
import SelectColumnFilter
  from '../../data-grid/column-filters/SelectColumnFilter';
import CoordinatesNearColumnFilter
  from '../../data-grid/column-filters/CoordinatesNearColumnFilter';
import NumberRangeColumnFilter
  from '../../data-grid/column-filters/NumberRangeColumnFilter';
import FileTable from '../../data-grid/FileTable';

import styles from '../../data-grid/LocationTable/LocationTable.module.css';

// TODO: Fix bad factorization of LocationTable and AppBody
// TODO: Add expand-all


const middleDecade = timePeriod => {
  if (!timePeriod) {
    return null;
  }
  const startYear = timePeriod.start.getFullYear();
  const endYear = timePeriod.end.getFullYear();
  return Math.floor((startYear + endYear) / 20) * 10;
}

export default function AppBody() {
  const locationsData = React.useMemo(
    () => locations.map(
      location => {
        const { latitude, longitude, files } = location;
        return ({
          ...location,

          coordinates: [latitude, longitude],

          timePeriodDecades: flow(
            map(({ timePeriod }) => middleDecade(timePeriod)),
            compact,
            uniq,
          )(files),

          scenarios: flow(
            map('scenario'),
            compact,
            uniq,
          )(files),

          filesData: map(
            file => {
              const {
                fileType, scenario, timePeriod, ensembleStatistic, variables
              } = file;
              return {
                ...file,
                fileType: capitalize(fileType),
                scenario: scenario || '???',
                timePeriodDecade:
                  timePeriod ? `${middleDecade(timePeriod)}s` : "???",
                ensembleStatistic: ensembleStatistic || "???",
                variables: variables || "???",
              }
            }
          )(files),
        })
      }
    ),
    []
  );



  const renderFiles = React.useCallback(
    ({ row, visibleColumns }) => (
      <tr className={styles.expander}>
        <td>&nbsp;</td>
        <td colSpan={visibleColumns.length-1}>
          <FileTable data={row.original.filesData}/>
        </td>
      </tr>
    )
  )

  return (
    <Row>
      <Col lg={12}>
        <LocationTable
          data={locationsData}
          renderRowExpansion={renderFiles}
        />
      </Col>
    </Row>
  );
}
