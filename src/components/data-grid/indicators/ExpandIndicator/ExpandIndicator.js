import React from 'react';
import Button from 'react-bootstrap/Button';


export default function ExpandIndicator({
  isExpanded = false,
}) {
  return (
    <Button
      size='sm'
      variant='outline-primary'
      title={`Click to ${isExpanded ? 'hide' : 'show'} files for this location`}
    >
      {isExpanded ? 'Hide' : 'Show'}
    </Button>
  );
}
