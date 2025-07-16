import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TopNav from './TopNav';

describe('TopNav', () => {
  it('renders logo and action buttons', () => {
    render(<TopNav />);
    expect(screen.getByAltText('Southwest Aquatics logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Schedule Lesson/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Notifications/i })).toBeInTheDocument();
  });

  // Add more tests for accessibility, responsiveness
}); 