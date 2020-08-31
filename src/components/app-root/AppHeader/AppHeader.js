import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pcicLogo from '../../../assets/pcic-logo.png';

export default function AppHeader() {
    return (
      <Row className={'AppHeader justify-content-center'}>
        <Col lg={'auto'} md={'auto'} sm={'auto'}>
          <a href='https://pacificclimate.org/' className={'logo'}>
            <img
              src={pcicLogo}
              width='328'
              height='38'
              alt='Pacific Climate Impacts Consortium'
            />
          </a>
          <a href='#'>
            Wx Files logo here
          </a>
        </Col>
      </Row>
    );
}
