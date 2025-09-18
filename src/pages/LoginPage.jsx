import React, { useState, useEffect } from 'react';
import { Stethoscope, User, Users, Bed, CheckSquare, BarChart2, ArrowLeft, LogOut, Calendar, Clock, Heart, ClipboardList, Package } from "lucide-react";
import PatientDashboard from './PatientDashboard';

// A helper object to map colors to full Tailwind classes to avoid dynamic class issues.
const colorMap = {
  blue: {
    bg: 'bg-blue-500',
    hoverBg: 'hover:bg-blue-600',
    text: 'text-blue-500',
    border: 'border-blue-500'
  },
  green: {
    bg: 'bg-green-500',
    hoverBg: 'hover:bg-green-600',
    text: 'text-green-500',
    border: 'border-green-500'
  },
  teal: {
    bg: 'bg-teal-500',
    hoverBg: 'hover:bg-teal-600',
    text: 'text-teal-500',
    border: 'border-teal-500'
  },
  purple: {
    bg: 'bg-purple-500',
    hoverBg: 'hover:bg-purple-600',
    text: 'text-purple-500',
    border: 'border-purple-500'
  },
  yellow: {
    bg: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600',
    text: 'text-yellow-500',
    border: 'border-yellow-500'
  },
  orange: {
    bg: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-600',
    text: 'text-orange-500',
    border: 'border-orange-500'
  },
};

// Data for the staff metric cards
const metricCards = [
  {
    title: "Bed Occupancy",
    description: "Real-time view of hospital bed availability and utilization.",
    icon: Bed,
    color: "blue",
  },
  {
    title: "Discharge Process",
    description: "Track patients from admission to discharge to ensure a smooth transition.",
    icon: CheckSquare,
    color: "green",
  },
  {
    title: "Operational Analytics",
    description: "Gain insights into hospital performance and optimize resource allocation.",
    icon: BarChart2,
    color: "teal",
  },
  {
    title: "Patient Management",
    description: "Manage patient records and streamline administrative tasks.",
    icon: User,
    color: "purple",
  },
  {
    title: "Staffing Metrics",
    description: "Monitor staff availability and workload to ensure optimal care.",
    icon: Users,
    color: "yellow",
  },
  {
    title: "Equipment Tracking",
    description: "Track the location and status of critical medical equipment.",
    icon: Stethoscope,
    color: "orange",
  },
];

// Data for the doctor's quick actions
const doctorActionCards = {
  'find-patient': {
    title: "Find Patient",
    description: "Search for and access a specific patient's medical records and history.",
    icon: User,
    color: "purple",
  },
  'schedule-appointment': {
    title: "Schedule Appointment",
    description: "Book new appointments and manage your daily calendar.",
    icon: Calendar,
    color: "green",
  },
  'view-records': {
    title: "View Health Records",
    description: "Access and review detailed health records, lab results, and reports for your patients.",
    icon: Heart,
    color: "teal",
  },
};

// Mock user data for demonstration
const MOCK_USERS = {
  'doctor@hospital.com': { role: 'doctor', name: 'Dr. Jane Smith' },
  'patient@hospital.com': { role: 'patient', name: 'John Doe' },
  'staff@hospital.com': { role: 'staff', name: 'Admin Assistant' },
};

// The main application component that handles navigation, authentication, and state.
export default function App() {
  const [user, setUser] = useState(MOCK_USERS['doctor@hospital.com']); // State for the current user
  const [currentPage, setCurrentPage] = useState('doctor-dashboard');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // New state variables for registration form
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  // Generates a new captcha value on component load and when mode changes
  useEffect(() => {
    if (!user) {
      generateCaptcha();
    }
  }, [user, isLoginMode]);

  const generateCaptcha = () => {
    setCaptchaValue(Math.floor(1000 + Math.random() * 9000).toString());
    setCaptchaInput('');
  };

  // Handles the login/registration process
  const handleAuth = (e) => {
    e.preventDefault();
    setAuthMessage(''); // Clear previous messages

    if (isLoginMode) {
      const authenticatedUser = MOCK_USERS[email];
      if (authenticatedUser) {
        setUser({ email, ...authenticatedUser });
        setEmail('');
        setPassword('');
        // Redirect directly to the correct dashboard based on user role
        if (authenticatedUser.role === 'doctor') {
          setCurrentPage('doctor-dashboard');
        } else if (authenticatedUser.role === 'staff') {
          setCurrentPage('staff-dashboard');
        } else if (authenticatedUser.role === 'patient') {
          setCurrentPage('patient-dashboard');
        } else {
          setCurrentPage('dashboard');
        }
      } else {
        setAuthMessage("Invalid credentials. Please use 'doctor@hospital.com', 'patient@hospital.com', or 'staff@hospital.com'");
      }
    } else {
      if (captchaInput !== captchaValue) {
        setAuthMessage("Incorrect captcha. Please try again.");
        generateCaptcha();
        return;
      }
      // Mock registration logic
      setAuthMessage("Registration is for demo purposes only. Please use one of the pre-defined users to log in.");
      setIsLoginMode(true);
      setFullName('');
      setAge('');
      setGender('');
      setCaptchaInput('');
    }
  };

  // Handles user logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  // Renders the login and registration forms
  const renderLoginRegister = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isLoginMode ? 'Login' : 'Register'}
        </h1>
        <form onSubmit={handleAuth}>
          {!isLoginMode && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {!isLoginMode && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Captcha</label>
              <div className="flex items-center space-x-4">
                <div className="p-2 w-24 text-center text-xl font-bold bg-gray-200 rounded-md select-none">
                  {captchaValue}
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter the code"
                  required
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors duration-300"
          >
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        {authMessage && (
          <p className="mt-4 text-center text-red-500 text-sm">{authMessage}</p>
        )}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setAuthMessage('');
              generateCaptcha();
            }}
            className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
          >
            {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );

  // Renders the details page when a card is clicked.
  const renderDetailsPage = () => (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => {
          if (user.role === 'doctor') {
            setCurrentPage('doctor-dashboard');
          } else if (user.role === 'staff') {
            setCurrentPage('staff-dashboard');
          } else {
            setCurrentPage('patient-dashboard');
          }
        }}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Go Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{selectedCard.title} Details</h1>
        <p className="text-gray-600 text-lg mb-6">{selectedCard.description}</p>
        <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 italic">
            This is a placeholder for the full dashboard view related to {selectedCard.title}.
            You can implement charts, data tables, and other metrics here.
          </p>
        </div>
      </div>
    </div>
  );

  // Renders a simplified dashboard for patients
  const renderPatientDashboard = () => (
    <PatientDashboard></PatientDashboard>
  );
  
  // Renders the main dashboard for staff
  const renderStaffDashboard = () => (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metricCards.map((card, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => {
              setSelectedCard(card);
              setCurrentPage('details');
            }}
          >
            {/* Colored top section with icon */}
            <div className={`p-8 ${colorMap[card.color].bg} rounded-t-2xl`}>
              <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-30 rounded-full mb-4">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{card.title}</h3>
            </div>
            {/* Content area */}
            <div className="p-8">
              <p className="text-gray-600 mb-6">{card.description}</p>
              <button 
                className={`w-full py-3 rounded-lg text-white font-bold transition-colors duration-300 ${colorMap[card.color].bg} ${colorMap[card.color].hoverBg}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renders the main dashboard for doctors
  const renderDoctorDashboard = () => (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16">Doctor's Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><ClipboardList className="mr-2 text-purple-600"/> Today's Appointments</h2>
          <ul className="text-left text-gray-700 space-y-3">
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-medium">Jane Doe</span>
                <p className="text-sm text-gray-500">Cardiology - 10:00 AM</p>
              </div>
              <button className="text-teal-500 hover:text-teal-700 font-medium">View Patient</button>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <span className="font-medium">Mike Johnson</span>
                <p className="text-sm text-gray-500">Neurology - 11:30 AM</p>
              </div>
              <button className="text-teal-500 hover:text-teal-700 font-medium">View Patient</button>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Package className="mr-2 text-yellow-600"/> New Messages & Lab Results</h2>
          <ul className="text-left text-gray-700 space-y-3">
            <li className="p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Lab Result:</span> Jane Doe - Cholesterol levels are normal.
            </li>
            <li className="p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Message:</span> Nurse Smith - Patient room 2B is ready.
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex justify-center space-x-6">
          <button 
            onClick={() => {
              setSelectedCard(doctorActionCards['find-patient']);
              setCurrentPage('details');
            }}
            className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors duration-300">
            <User className="w-10 h-10 mb-2"/>
            <span className="font-medium">Find Patient</span>
          </button>
          <button 
            onClick={() => {
              setSelectedCard(doctorActionCards['schedule-appointment']);
              setCurrentPage('details');
            }}
            className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors duration-300">
            <Calendar className="w-10 h-10 mb-2"/>
            <span className="font-medium">Schedule Appointment</span>
          </button>
          <button 
            onClick={() => {
              setSelectedCard(doctorActionCards['view-records']);
              setCurrentPage('details');
            }}
            className="flex flex-col items-center text-gray-600 hover:text-teal-600 transition-colors duration-300">
            <Heart className="w-10 h-10 mb-2"/>
            <span className="font-medium">View Health Records</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Main render logic based on user and currentPage state.
  const renderAppContent = () => {
    if (!user) {
      return renderLoginRegister();
    }
    
    switch (currentPage) {
      case 'dashboard':
      case 'doctor-dashboard':
        return renderDoctorDashboard();
      case 'staff-dashboard':
        return renderStaffDashboard();
      case 'patient-dashboard':
        return renderPatientDashboard();
      case 'details':
        return renderDetailsPage();
      default:
        return renderLoginRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <Stethoscope className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold text-gray-800 ml-2">HealTrack</span>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium hidden md:block">Welcome, {user.name} ({user.role})</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:block ml-1">Logout</span>
              </button>
            </div>
          )}
        </nav>
      </header>
      {renderAppContent()}
    </div>
  );
}
