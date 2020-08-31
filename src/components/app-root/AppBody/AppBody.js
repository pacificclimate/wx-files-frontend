import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import map from 'lodash/fp/map';
import locations from '../../../assets/locations';


export default class AppBody extends React.Component {
  static propTypes = {
  };

  state = {
  };

  render() {
    return (
      <Row>
        <Col lg={12}>
          <ul>
            {
              map(loc => (
                <li>
                  <div>
                    Name: {loc.name}, {' '}
                    Code: {loc.code}, {' '}
                    Lat: {loc.latitude}, {' '}
                    Lon: {loc.longitude}
                  </div>
                  Files:
                  <ul>
                    {
                      map(file => (
                        <li>
                          Type: {file.fileType}, {' '}
                          {
                            file.fileType === "weather" ?
                              file.timePeriod.start :
                              "..."
                          }
                        </li>
                      ))(loc.files)
                    }
                  </ul>
                </li>
              ))(locations)
            }
          </ul>
        </Col>
      </Row>
    );
  }
}
