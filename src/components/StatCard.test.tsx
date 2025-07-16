import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from './StatCard';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Total Lessons" value={10} />);
    expect(screen.getByText('Total Lessons')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  // Add more tests for icon/color, accessibility, responsiveness
}); 