import React from 'react';
import { render, screen } from '@testing-library/react';
import FileTable from './FileTable';

test('renders expected columns', () => {
  render(
    <FileTable
      data={[]}
    />
  );
  // screen.debug()
  expect(screen.getByText('Type')).toBeInTheDocument();
  expect(screen.getByText('Scenario')).toBeInTheDocument();
  expect(screen.getByText('Time Period')).toBeInTheDocument();
  expect(screen.getByText('Ensemble Statistic')).toBeInTheDocument();
  expect(screen.getByText('Variables')).toBeInTheDocument();
  expect(screen.getByText('Download')).toBeInTheDocument();
});
