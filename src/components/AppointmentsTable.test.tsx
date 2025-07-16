import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppointmentsTable from './AppointmentsTable';

describe('AppointmentsTable', () => {
  it('renders table columns', () => {
    render(<AppointmentsTable lessons={[]} />);
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Student Name')).toBeInTheDocument();
    expect(screen.getByText('Instructor')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('Pool Zone')).toBeInTheDocument();
  });

  it('shows empty state when no lessons', () => {
    render(<AppointmentsTable lessons={[]} />);
    expect(screen.getByText('No lessons today.')).toBeInTheDocument();
  });

  // Add more tests for rows, accessibility, responsiveness
}); 