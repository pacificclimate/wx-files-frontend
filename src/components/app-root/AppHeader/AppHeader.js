/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pcicLogo from '../../../assets/pcic-logo.png';
import wxFilesLogo from '../../../assets/wx-files-logo.png';
import styles from './AppHeader.module.css';

export default function AppHeader() {
    return (
      <Row className={`${styles.AppHeader} justify-content-center`}>
        <Col lg={'auto'} md={'auto'} sm={'auto'}>
          <a href='https://pacificclimate.org/' className={styles.logo}>
            <img
              src={pcicLogo}
              width='328'
              height='38'
              alt='Pacific Climate Impacts Consortium'
            />
          </a>
          <a href='#'>
            <img
              src={wxFilesLogo}
              alt={'Wx Files'}
            />
          </a>
        </Col>
      </Row>
    );
}
