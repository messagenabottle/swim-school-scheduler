import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoaderSwimmer from './LoaderSwimmer';

describe('LoaderSwimmer', () => {
  it('renders animated swimmer when loading', () => {
    render(<LoaderSwimmer loading={true} />);
    expect(screen.getByTestId('loader-swimmer')).toBeInTheDocument();
  });

  // Add more tests for aria-live, accessibility
}); 