import React from 'react';

/**
 * Navigation section types for the swim school scheduler
 */
export type NavigationSection = 'Dashboard' | 'Schedule' | 'Instructors' | 'Clients';

/**
 * Props for the Layout component
 * 
 * @property activeSection - The currently active navigation section
 * @property onSectionChange - Callback function when navigation section changes
 * @property children - React children to render in the main content area
 * 
 * @example
 * ```tsx
 * <Layout 
 *   activeSection="Dashboard" 
 *   onSectionChange={(section) => setActiveSection(section)}
 * >
 *   <DashboardContent />
 * </Layout>
 * ```
 */
export interface LayoutProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
  children: React.ReactNode;
}

/**
 * Main layout component for the swim school scheduler application.
 * 
 * Provides a consistent layout structure with:
 * - Professional header with app title
 * - Navigation menu with all major sections
 * - Main content area for page content
 * - Responsive design for desktop and mobile
 * - Blue/aqua swim school theme
 * 
 * @param props - Layout component props
 * @returns JSX element representing the application layout
 * 
 * @example
 * ```tsx
 * <Layout 
 *   activeSection="Instructors" 
 *   onSectionChange={handleSectionChange}
 * >
 *   <InstructorList />
 * </Layout>
 * ```
 */
const Layout: React.FC<LayoutProps> = ({ 
  activeSection, 
  onSectionChange, 
  children 
}) => {
  const navigationSections: NavigationSection[] = [
    'Dashboard',
    'Schedule', 
    'Instructors',
    'Clients'
  ];

  const handleNavClick = (section: NavigationSection) => {
    onSectionChange(section);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header 
        role="banner" 
        className="bg-blue-600 text-white shadow-lg px-4 md:px-6 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Swim School Scheduler
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav 
        role="navigation" 
        className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-2 flex flex-col md:flex-row"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {navigationSections.map((section) => {
              const isActive = section === activeSection;
              return (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {section}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        role="main" 
        className="flex-1 p-4 md:p-6"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 