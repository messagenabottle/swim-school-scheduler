import React from 'react';

export interface LessonRow {
  time?: string;
  studentName?: string;
  instructor?: string;
  level?: string | number;
  poolZone?: string;
}

export interface AppointmentsTableProps {
  lessons: LessonRow[];
}

/**
 * Displays a simple table of lessons for the day with an empty state.
 *
 * @param props - Component props including the list of lessons
 * @returns Table element listing lessons or an empty state message
 */
const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ lessons }) => {
  const hasRows = Array.isArray(lessons) && lessons.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600">
            <th className="pb-2">Time</th>
            <th className="pb-2">Student Name</th>
            <th className="pb-2">Instructor</th>
            <th className="pb-2">Level</th>
            <th className="pb-2">Pool Zone</th>
          </tr>
        </thead>
        <tbody>
          {!hasRows ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-6">
                No lessons today.
              </td>
            </tr>
          ) : (
            lessons.map((l, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{l.time ?? ''}</td>
                <td className="py-2">{l.studentName ?? ''}</td>
                <td className="py-2">{l.instructor ?? ''}</td>
                <td className="py-2">{l.level ?? ''}</td>
                <td className="py-2">{l.poolZone ?? ''}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;



