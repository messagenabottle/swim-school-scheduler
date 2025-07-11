import React, { useState } from 'react';
import Layout from './components/Layout';
import type { NavigationSection } from './components/Layout';
import InstructorForm from './components/InstructorForm';
import './App.css';

/**
 * Main App component showcasing the swim school scheduler components
 */
function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('Dashboard');
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [instructors, setInstructors] = useState<Array<{ id: string; name: string }>>([
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
  ]);

  const handleSectionChange = (section: NavigationSection) => {
    setActiveSection(section);
    setShowInstructorForm(false);
  };

  const handleInstructorSuccess = (instructorId: string, name: string) => {
    const newInstructor = { id: instructorId, name };
    setInstructors(prev => [...prev, newInstructor]);
    setShowInstructorForm(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Instructors</h3>
                <p className="text-3xl font-bold text-blue-600">{instructors.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Appointments</h3>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Clients</h3>
                <p className="text-3xl font-bold text-purple-600">45</p>
              </div>
            </div>
          </div>
        );
      case 'Schedule':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Schedule</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Schedule management coming soon...</p>
            </div>
          </div>
        );
      case 'Instructors':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Instructors</h2>
              <button
                onClick={() => setShowInstructorForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Add Instructor
              </button>
            </div>
            {showInstructorForm ? (
              <InstructorForm
                onSuccess={handleInstructorSuccess}
                onCancel={() => setShowInstructorForm(false)}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Instructors</h3>
                  {instructors.length === 0 ? (
                    <p className="text-gray-500">No instructors added yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {instructors.map(instructor => (
                        <div key={instructor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{instructor.name}</span>
                          <span className="text-sm text-gray-500">ID: {instructor.id}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      case 'Clients':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Clients</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Client management coming soon...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={handleSectionChange}>
      {renderContent()}
    </Layout>
  );
}

export default App;
