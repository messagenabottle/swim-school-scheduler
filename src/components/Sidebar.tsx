import React, { useState } from 'react';

export interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
}

/**
 * Sidebar navigation for the admin dashboard. Collapsible, accessible, and includes submenus.
 *
 * @param collapsed - Whether the sidebar is collapsed
 * @param onToggle - Function to toggle collapse
 * @param activeItem - The currently active nav item
 * @returns Sidebar navigation component
 */
const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle = () => {}, activeItem }) => {
  const [reportsOpen, setReportsOpen] = useState(false);
  const navItems = [
    { label: 'Dashboard', icon: '🏠' },
    { label: 'Schedule', icon: '📅' },
    { label: 'Students', icon: '👨‍🎓' },
    { label: 'Instructors', icon: '🏊' },
    { label: 'Billing', icon: '💳' },
    { label: 'Reports', icon: '📊', submenu: [
      { label: 'Attendance' },
      { label: 'Performance' }
    ] }
  ];

  return (
    <nav
      role="navigation"
      aria-label="Sidebar"
      className={`bg-white shadow-md h-full transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'} z-10`}
      data-testid="sidebar"
    >
      <button
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={onToggle}
        className="m-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
      >
        {collapsed ? '➡️' : '⬅️'}
      </button>
      <ul className="flex-1 space-y-2 mt-4">
        {navItems.map((item) => (
          <li key={item.label}>
            {item.submenu ? (
              <>
                <button
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeItem === item.label ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  aria-expanded={reportsOpen}
                  aria-controls="reports-submenu"
                  onClick={() => setReportsOpen((open) => !open)}
                >
                  <span className="mr-3 text-lg" aria-hidden>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                  <span className="ml-auto" aria-hidden>{reportsOpen ? '▲' : '▼'}</span>
                </button>
                <ul
                  id="reports-submenu"
                  className={`ml-8 mt-1 space-y-1 transition-all ${reportsOpen && !collapsed ? 'block' : 'hidden'}`}
                >
                  {item.submenu.map((sub) => (
                    <li key={sub.label}>
                      <button
                        className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        tabIndex={reportsOpen && !collapsed ? 0 : -1}
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <button
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${activeItem === item.label ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                aria-current={activeItem === item.label ? 'page' : undefined}
              >
                <span className="mr-3 text-lg" aria-hidden>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar; 