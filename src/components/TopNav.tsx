import React from 'react';

/**
 * TopNav component for the admin dashboard. Displays logo and action buttons.
 *
 * @returns Top navigation bar
 *
 * @example
 * <TopNav />
 */
const TopNav: React.FC = () => {
  return (
    <header
      role="banner"
      className="w-full flex items-center justify-between bg-white shadow px-4 py-3 h-16 z-20"
      data-testid="topnav"
    >
      <div className="flex items-center">
        <img
          src="/logo-southwest-aquatics.svg"
          alt="Southwest Aquatics logo"
          className="h-10 w-auto mr-4"
        />
        <span className="font-bold text-lg text-[#a10d16] tracking-wide hidden sm:inline" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          Southwest Aquatics
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="bg-[#007cbf] hover:bg-[#30cfcf] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold transition-colors"
          aria-label="Schedule Lesson"
        >
          Schedule Lesson
        </button>
        <button
          className="bg-white border border-gray-300 hover:bg-gray-100 text-[#007cbf] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors relative"
          aria-label="Notifications"
        >
          <span className="sr-only">Notifications</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopNav; 