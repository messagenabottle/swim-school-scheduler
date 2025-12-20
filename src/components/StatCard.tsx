import React from 'react';

export interface StatCardProps {
  label: string;
  value: number | string;
}

/**
 * Displays a simple statistic card with a label and value.
 *
 * @param props - Label and value to display
 * @returns A styled card element
 */
const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-gray-600 text-sm">{label}</div>
      <div className="text-2xl font-semibold text-blue-600">{String(value)}</div>
    </div>
  );
};

export default React.memo(StatCard);



