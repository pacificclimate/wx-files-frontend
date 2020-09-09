import React from 'react';
import Card from 'react-bootstrap/Card';


export default function Note({ title, children }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text>
          {children}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}