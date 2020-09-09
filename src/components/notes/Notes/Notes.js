import React from 'react';
import Cards from 'react-bootstrap/CardColumns';


export default function Notes({ children }) {
  return (
    <Cards>{children}</Cards>
  );
}