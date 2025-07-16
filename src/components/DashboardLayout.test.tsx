import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardLayout from './DashboardLayout';

vi.mock('./Sidebar', () => ({ default: () => <nav data-testid="sidebar" /> }));
vi.mock('./TopNav', () => ({ default: () => <header data-testid="topnav" /> }));

describe('DashboardLayout', () => {
  it('renders sidebar, topnav, and main content area', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('topnav')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies ARIA roles and landmarks', () => {
    render(<DashboardLayout><div>Content</div></DashboardLayout>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  // Add more tests for responsiveness, keyboard navigation, etc.
}); 