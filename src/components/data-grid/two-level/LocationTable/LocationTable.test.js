import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationTable from './LocationTable';

test('renders expected top-level columns', () => {
  render(
    <LocationTable
      locations={[]}
    />
  );
  // screen.debug()
  expect(screen.getByText('Files')).toBeInTheDocument();
  expect(screen.getByText('City')).toBeInTheDocument();
  expect(screen.getByText('Province')).toBeInTheDocument();
  expect(screen.getByText('Code')).toBeInTheDocument();
  expect(screen.getByText('Coordinates')).toBeInTheDocument();
  expect(screen.getByText('Elevation')).toBeInTheDocument();
  expect(screen.getByText('Time Periods')).toBeInTheDocument();
  expect(screen.getByText('Scenarios')).toBeInTheDocument();
});
