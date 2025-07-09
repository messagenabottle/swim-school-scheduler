import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

/**
 * Layout Component Tests
 * 
 * Tests the main layout component including:
 * - Header with app title
 * - Navigation with all required sections
 * - Active section highlighting
 * - Responsive design
 * - Children rendering
 */
describe('Layout', () => {
  const defaultProps = {
    activeSection: 'Dashboard' as const,
    onSectionChange: vi.fn(),
  };

  const renderLayout = (props = {}) => {
    return render(
      <Layout {...defaultProps} {...props}>
        <div data-testid="main-content">Test Content</div>
      </Layout>
    );
  };

  it('should display "Swim School Scheduler" title in header', () => {
    renderLayout();
    const title = screen.getByText('Swim School Scheduler');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  it('should render all required navigation sections', () => {
    renderLayout();
    
    const expectedSections = ['Dashboard', 'Schedule', 'Instructors', 'Clients'];
    expectedSections.forEach(section => {
      const navItem = screen.getByRole('button', { name: section });
      expect(navItem).toBeInTheDocument();
    });
  });

  it('should highlight the active section', () => {
    renderLayout({ activeSection: 'Instructors' });
    
    const activeNavItem = screen.getByRole('button', { name: 'Instructors' });
    expect(activeNavItem).toHaveClass('bg-blue-600', 'text-white');
    
    const inactiveNavItem = screen.getByRole('button', { name: 'Dashboard' });
    expect(inactiveNavItem).toHaveClass('text-blue-600', 'hover:bg-blue-50');
  });

  it('should call onSectionChange when navigation item is clicked', () => {
    const onSectionChange = vi.fn();
    renderLayout({ onSectionChange });
    
    const scheduleButton = screen.getByRole('button', { name: 'Schedule' });
    scheduleButton.click();
    
    expect(onSectionChange).toHaveBeenCalledWith('Schedule');
  });

  it('should render children content in main area', () => {
    renderLayout();
    
    const mainContent = screen.getByTestId('main-content');
    expect(mainContent).toBeInTheDocument();
    expect(mainContent.textContent).toBe('Test Content');
  });

  it('should have responsive design classes', () => {
    renderLayout();
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('px-4', 'md:px-6');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex', 'flex-col', 'md:flex-row');
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex-1', 'p-4', 'md:p-6');
  });

  it('should have proper accessibility attributes', () => {
    renderLayout();
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should use swim school blue/aqua theme colors', () => {
    renderLayout();
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-blue-600');
    
    const title = screen.getByText('Swim School Scheduler');
    expect(title).toHaveClass('text-white');
    
    const navItems = screen.getAllByRole('button');
    navItems.forEach(item => {
      expect(item).toHaveClass(/blue-/);
    });
  });

  it('should handle empty children gracefully', () => {
    render(
      <Layout {...defaultProps}>
        {null}
      </Layout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
}); 