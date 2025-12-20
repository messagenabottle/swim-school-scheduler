import React, { useState, useEffect } from 'react';
import { getInstructors } from '../lib/firestore';
import type { Instructor } from '../types';

/**
 * InstructorList component for displaying all swim instructors.
 * 
 * Features:
 * - Fetches instructors from Firestore on mount
 * - Displays loading state during data fetch
 * - Shows empty state when no instructors exist
 * - Handles and displays errors gracefully
 * - Responsive list display with swim school theme
 * - Proper TypeScript typing
 * 
 * @returns JSX element representing the instructor list
 * 
 * @example
 * ```tsx
 * <InstructorList />
 * ```
 */
const InstructorList: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches instructors from Firestore
   */
  useEffect(() => {
    let isCancelled = false;

    async function fetchInstructors() {
      try {
        setLoading(true);
        setError(null);
        const data = await getInstructors();
        if (!isCancelled) {
          setInstructors(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load instructors');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchInstructors();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Instructors</h3>
        <p className="text-gray-500">Loading instructors...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Instructors</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (instructors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Instructors</h3>
        <p className="text-gray-500">No instructors added yet.</p>
      </div>
    );
  }

  // List display
  return (
    <div className="bg-white rounded-lg shadow-md" data-testid="instructor-list">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Instructors</h3>
        <ul className="space-y-3" role="list">
          {instructors.map((instructor) => (
            <li
              key={instructor.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="font-medium text-gray-900">{instructor.name}</span>
              <span className="text-sm text-gray-500">ID: {instructor.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstructorList;

