import React from 'react';
import Button from 'react-bootstrap/Button';


export default function ExpandIndicator({
  isExpanded = false,
}) {
  return (
    <Button size='sm' variant='outline-primary'>
      {isExpanded ? 'Hide' : 'Show'}
    </Button>
  );
}
