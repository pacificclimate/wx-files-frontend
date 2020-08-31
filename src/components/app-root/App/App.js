import React from 'react';
import Container from 'react-bootstrap/Container';
import AppHeader from '../AppHeader';
import AppBody from '../AppBody';
import './App.css';

function App() {
  return (
    <Container fluid>
      <AppHeader/>
      <AppBody/>
    </Container>
  );
}

export default App;
