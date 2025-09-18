import React, { useState, useEffect } from 'react';

// Hardcoded doctor data
const doctors = {
  'Cardiac': [
    { name: 'Dr. Evelyn Reed', specialization: 'Cardiologist', rating: '4.8' },
    { name: 'Dr. James Chen', specialization: 'Interventional Cardiology', rating: '4.9' }
  ],
  'Endocrine': [
    { name: 'Dr. Sarah Miller', specialization: 'Endocrinologist', rating: '4.7' },
    { name: 'Dr. David Lee', specialization: 'Diabetology', rating: '4.6' }
  ],
  'Physician': [
    { name: 'Dr. Michael Brown', specialization: 'General Practice', rating: '4.5' },
    { name: 'Dr. Olivia Wilson', specialization: 'Internal Medicine', rating: '4.8' }
  ],
  'Orthopaedic': [
    { name: 'Dr. Robert Davis', specialization: 'Orthopaedic Surgeon', rating: '4.9' },
    { name: 'Dr. Jessica White', specialization: 'Sports Medicine', rating: '4.7' }
  ]
};

// Main React App Component
export default function App() {
  // State for controlling the visibility of different UI sections
  const [showPopup, setShowPopup] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [showConsultPage, setShowConsultPage] = useState(false);
  const [showEmergencyPage, setShowEmergencyPage] = useState(false);

  // State for form selections
  const [problemType, setProblemType] = useState('');
  const [consultType, setConsultType] = useState('');
  const [specificProblem, setSpecificProblem] = useState('');

  // State for animating the popup
  const [popupAnimation, setPopupAnimation] = useState({
    scale: 'scale-95',
    opacity: 'opacity-0'
  });

  // Effect to handle the popup's fade-in animation
  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        setPopupAnimation({
          scale: 'scale-100',
          opacity: 'opacity-100'
        });
      }, 10);
    }
  }, [showPopup]);

  // Function to reset the application state and start over
  const resetApp = () => {
    setShowPopup(false);
    setShowRedirect(false);
    setShowConsultPage(false);
    setShowEmergencyPage(false);
    setProblemType('');
    setConsultType('');
    setSpecificProblem('');
    setPopupAnimation({ scale: 'scale-95', opacity: 'opacity-0' });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
    setShowRedirect(true);

    // Simulate a delay for processing the request
    setTimeout(() => {
      setShowRedirect(false);
      if (consultType === 'Consult') {
        setShowConsultPage(true);
      } else if (consultType === 'Emergency') {
        setShowEmergencyPage(true);
      }
    }, 2000);
  };

  // Conditional rendering for specific problem options based on main problemType
  const renderSpecificProblemOptions = () => {
    switch (problemType) {
      case 'Cardiac':
        return (
          <div id="cardiac-options" className="grid grid-cols-2 gap-4">
            <div>
              <input type="radio" id="arrhythmia" name="specificProblem" value="Arrhythmia" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} required />
              <label htmlFor="arrhythmia" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Arrhythmia</span>
              </label>
            </div>
            <div>
              <input type="radio" id="chest-pain" name="specificProblem" value="Chest Pain" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} />
              <label htmlFor="chest-pain" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Chest Pain</span>
              </label>
            </div>
          </div>
        );
      case 'Endocrine':
        return (
          <div id="endocrine-options" className="grid grid-cols-2 gap-4">
            <div>
              <input type="radio" id="thyroid" name="specificProblem" value="Thyroid Issue" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} required />
              <label htmlFor="thyroid" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Thyroid Issue</span>
              </label>
            </div>
            <div>
              <input type="radio" id="diabetes" name="specificProblem" value="Diabetes Management" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} />
              <label htmlFor="diabetes" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Diabetes Management</span>
              </label>
            </div>
          </div>
        );
      case 'Physician':
        return (
          <div id="physician-options" className="grid grid-cols-2 gap-4">
            <div>
              <input type="radio" id="checkup" name="specificProblem" value="General Check-up" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} required />
              <label htmlFor="checkup" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">General Check-up</span>
              </label>
            </div>
            <div>
              <input type="radio" id="referral" name="specificProblem" value="Referral" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} />
              <label htmlFor="referral" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Referral</span>
              </label>
            </div>
          </div>
        );
      case 'Orthopaedic':
        return (
          <div id="orthopaedic-options" className="grid grid-cols-2 gap-4">
            <div>
              <input type="radio" id="fracture" name="specificProblem" value="Fracture" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} required />
              <label htmlFor="fracture" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Fracture</span>
              </label>
            </div>
            <div>
              <input type="radio" id="sprain" name="specificProblem" value="Sprain" className="hidden" onChange={(e) => setSpecificProblem(e.target.value)} />
              <label htmlFor="sprain" className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700">
                <span className="font-medium">Sprain</span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen">
      <style>
        {`
          .ai-gradient {
            background-image: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
            --tw-gradient-from: #14B8A6;
            --tw-gradient-to: #06B6D4;
          }
          input[type="radio"]:checked + label {
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-color: #06b6d4;
            --tw-bg-opacity: 1;
            background-color: rgb(236 254 252 / var(--tw-bg-opacity));
            --tw-text-opacity: 1;
            color: rgb(20 184 166 / var(--tw-text-opacity));
          }
          input[type="radio"]:focus + label {
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-color: #06b6d4;
          }
        `}
      </style>
      
      {/* Main Application Container */}
      <div id="app-container" className="w-full h-full flex items-center justify-center">

        {/* Initial content to trigger the popup */}
        {!(showRedirect || showConsultPage || showEmergencyPage) && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transition-all duration-300 transform scale-100">
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Hwaltrack AI Consult</h1>
            <p className="text-gray-600 mt-2">Click the button below to launch an AI-powered consult.</p>
            <button
              id="show-popup-btn"
              onClick={() => setShowPopup(true)}
              className="mt-6 px-6 py-3 ai-gradient text-white rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity duration-300"
            >
              Launch AI Consult
            </button>
          </div>
        )}

        {/* The Popup Modal - Initially Hidden */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8 transform transition-all duration-300 ${popupAnimation.scale} ${popupAnimation.opacity}`}>
              <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-6">Describe Your Problem</h2>

              {/* The form inside the popup */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Problem Type Section */}
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-4">1. What type of problem are you experiencing?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Cardiac', 'Endocrine', 'Physician', 'Orthopaedic'].map(type => (
                      <div key={type}>
                        <input
                          type="radio"
                          id={type.toLowerCase()}
                          name="problemType"
                          value={type}
                          className="hidden"
                          onChange={(e) => setProblemType(e.target.value)}
                          required
                        />
                        <label
                          htmlFor={type.toLowerCase()}
                          className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700"
                        >
                          <span className="font-medium">{type}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic "Specific Problem" Section */}
                {problemType && (
                  <div id="specific-problem-section">
                    <p className="text-lg font-semibold text-gray-800 mb-4">2. Please specify your problem.</p>
                    {renderSpecificProblemOptions()}
                  </div>
                )}
                
                {/* Consult Type Section */}
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-4">3. Is this a consult or an emergency?</p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Consult', 'Emergency'].map(type => (
                      <div key={type}>
                        <input
                          type="radio"
                          id={type.toLowerCase()}
                          name="consultType"
                          value={type}
                          className="hidden"
                          onChange={(e) => setConsultType(e.target.value)}
                          required
                        />
                        <label
                          htmlFor={type.toLowerCase()}
                          className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 text-gray-700"
                        >
                          <span className="font-medium">{type}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 ai-gradient text-white font-bold rounded-full shadow-md hover:opacity-90 transition-opacity duration-300"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        )}

        {/* The "Redirecting" Message */}
        {showRedirect && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg transition-all duration-300 transform scale-100">
            <svg className="mx-auto h-12 w-12 text-cyan-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m1.581 2.909a3 3 0 10-3.149 3.149m-1.581-1.582h-5"/>
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">Processing your request with AI...</h1>
            <p className="text-gray-600 mt-2">Please wait while we find the best option for you.</p>
          </div>
        )}

        {/* The Consult Doctor List Page */}
        {showConsultPage && (
          <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Available Doctors for <span className="text-cyan-600">{problemType}</span></h2>
            <div id="doctor-list" className="space-y-4">
              {doctors[problemType]?.map((doctor, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex items-start space-x-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                    <div className="flex items-center mt-2">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="ml-1 text-gray-700 font-medium">{doctor.rating} Rating</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={resetApp} className="mt-8 w-full py-3 ai-gradient text-white rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity duration-300">
              Start New Consult
            </button>
          </div>
        )}

        {/* The Emergency Page */}
        {showEmergencyPage && (
          <div className="text-center p-8 bg-white rounded-xl shadow-lg w-full max-w-xl">
            <svg className="mx-auto h-16 w-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.154 0 2.124-.95 2.124-2.13v-9.74c0-1.18-.97-2.13-2.124-2.13h-13.856c-1.154 0-2.124.95-2.124 2.13v9.74c0 1.18.97 2.13 2.124 2.13zM12 21a9 9 0 100-18 9 9 0 000 18z"/>
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Emergency Alert</h2>
            <p className="text-gray-600 mt-2">All beds for <span className="text-red-600">{problemType}</span> patients are currently occupied.</p>
            <p className="text-gray-600 mt-2 font-semibold">Please proceed to the nearest available hospital immediately.</p>
            <button onClick={resetApp} className="mt-8 w-full py-3 ai-gradient text-white rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity duration-300">
              Start New Consult
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
