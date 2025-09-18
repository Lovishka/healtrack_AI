import React, { useState, useEffect } from 'react';
import { Stethoscope, User, Users, Bed, CheckSquare, BarChart2, ArrowLeft, LogOut, Calendar, Clock, Heart, ClipboardList, Package, Home, Contact, Hospital, ArrowRight, LayoutDashboard, FileText, Pill, Syringe } from "lucide-react";
import PatientDashboard from './pages/PatientDashboard';
import StaffDashboard from './pages/StaffDashboard';
import HospitalDashboard from './pages/HospitalDashboard';

// A helper object to map colors to full Tailwind classes to avoid dynamic class issues.
const colorMap = {
  blue: {
    bg: 'bg-blue-500',
    hoverBg: 'hover:bg-blue-600',
    text: 'text-blue-500',
    border: 'border-blue-500',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-500',
    hoverBg: 'hover:bg-green-600',
    text: 'text-green-500',
    border: 'border-green-500',
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
  },
  teal: {
    bg: 'bg-teal-500',
    hoverBg: 'hover:bg-teal-600',
    text: 'text-teal-500',
    border: 'border-teal-500',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
  },
  purple: {
    bg: 'bg-purple-500',
    hoverBg: 'hover:bg-purple-600',
    text: 'text-purple-500',
    border: 'border-purple-500',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
  },
  yellow: {
    bg: 'bg-yellow-500',
    hoverBg: 'hover:bg-yellow-600',
    text: 'text-yellow-500',
    border: 'border-yellow-500',
    iconBg: 'bg-yellow-100',
    iconText: 'text-yellow-600',
  },
  orange: {
    bg: 'bg-orange-500',
    hoverBg: 'hover:bg-orange-600',
    text: 'text-orange-500',
    border: 'border-orange-500',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
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

// Mock user and patient data for demonstration
const MOCK_USERS = {
  'doctor@hospital.com': { role: 'doctor', name: 'Dr. Jane Smith' },
  'patient@hospital.com': { role: 'patient', name: 'John Doe' },
  'staff@hospital.com': { role: 'staff', name: 'Admin Assistant' },
  'hospital@admin.com': { role: 'hospital-admin', name: 'Hospital Admin' },
};

const MOCK_PATIENTS = {
  'Muskan': {
    id: 'Muskan',
    name: 'Muskan',
    age: 35,
    gender: 'Female',
    condition: 'Chronic Hypertension',
    admitted: '2024-09-10',
    bloodType: 'A+',
    allergies: ['Penicillin'],
    medications: ['Lisinopril 20mg daily'],
    history: [
      { date: '2023-05-15', description: 'Annual physical examination. Blood pressure elevated.' },
      { date: '2024-01-20', description: 'Follow-up on blood pressure. Started Lisinopril medication.' },
      { date: '2024-09-10', description: 'Admitted for hypertension management and monitoring.' },
    ],
    vitals: {
      'blood-pressure': '145/95 mmHg',
      'heart-rate': '82 bpm',
      'temperature': '98.6°F',
      'oxygen-saturation': '97%',
    },
    upcomingAppointments: [
      { date: '2025-01-20', time: '10:00 AM', reason: 'Cardiology Follow-up' },
    ],
  },
  'Aadarsh': {
    id: 'Aadarsh',
    name: 'Aadarsh',
    age: 22,
    gender: 'Male',
    condition: 'Migraines',
    admitted: '2024-09-12',
    bloodType: 'O-',
    allergies: ['Sulfa drugs'],
    medications: ['Sumatriptan 100mg PRN'],
    history: [
      { date: '2024-09-12', description: 'Admitted for severe, intractable migraines.' },
    ],
    vitals: {
      'blood-pressure': '125/80 mmHg',
      'heart-rate': '70 bpm',
      'temperature': '98.2°F',
      'oxygen-saturation': '99%',
    },
    upcomingAppointments: [
      { date: '2025-01-22', time: '11:30 AM', reason: 'Neurology Follow-up' },
    ],
  },
  'Bhoomi': {
    id: 'Bhoomi',
    name: 'Bhoomi',
    age: 22,
    gender: 'Female',
    condition: 'Migraines',
    admitted: '2024-09-12',
    bloodType: 'O-',
    allergies: ['Sulfa drugs'],
    medications: ['Sumatriptan 100mg PRN'],
    history: [
      { date: '2024-09-12', description: 'Admitted for severe, intractable migraines.' },
    ],
    vitals: {
      'blood-pressure': '125/80 mmHg',
      'heart-rate': '70 bpm',
      'temperature': '98.2°F',
      'oxygen-saturation': '99%',
    },
    upcomingAppointments: [
      { date: '2025-01-22', time: '11:30 AM', reason: 'Neurology Follow-up' },
    ],
  },
};


// The main application component that handles navigation, authentication, and state.
export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Generates a new captcha value on component load and when mode changes
  useEffect(() => {
    if (!user && currentPage === 'login-register') {
      generateCaptcha();
    }
  }, [user, isLoginMode, currentPage]);

  const generateCaptcha = () => {
    setCaptchaValue(Math.floor(1000 + Math.random() * 9000).toString());
    setCaptchaInput('');
  };

  // Handles the login/registration process
  const handleAuth = (e) => {
    e.preventDefault();
    setAuthMessage('');

    if (isLoginMode) {
      const authenticatedUser = MOCK_USERS[email];
      if (authenticatedUser && authenticatedUser.role === selectedRole) {
        setUser({ email, ...authenticatedUser });
        setEmail('');
        setPassword('');
        navigateToDashboard(authenticatedUser.role);
      } else {
        setAuthMessage(`Invalid credentials for a ${selectedRole} account. Please check your role and try again.`);
      }
    } else {
      if (captchaInput !== captchaValue) {
        setAuthMessage("Incorrect captcha. Please try again.");
        generateCaptcha();
        return;
      }
      setAuthMessage("Registration is for demo purposes only. Please use one of the pre-defined users to log in.");
      setIsLoginMode(true);
      setFullName('');
      setAge('');
      setGender('');
      setCaptchaInput('');
    }
  };

  const navigateToDashboard = (role) => {
    if (role === 'doctor') {
      setCurrentPage('doctor-dashboard');
    } else if (role === 'staff') {
      setCurrentPage('staff-dashboard');
    } else if (role === 'patient') {
      setCurrentPage('patient-dashboard');
    } else if (role === 'hospital-admin') {
      setCurrentPage('hospital-dashboard');
    }
  };

  // Handles user logout
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };
  
  // Navbar component for easy navigation
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-teal-600"><img 
  src="/healtrack/public/logo.webp" 
  alt="HealTrack Logo" 
  className="w-auto h-20"
/></span>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              
              <button onClick={() => setCurrentPage('home')} className="flex items-center px-3 py-2 text-gray-600 hover:text-teal-600 rounded-lg transition-colors">
                <Home className="w-5 h-5 mr-1" /> Home
              </button>
              <button onClick={() => navigateToDashboard(user.role)} className="flex items-center px-3 py-2 text-gray-600 hover:text-teal-600 rounded-lg transition-colors">
                <LayoutDashboard className="w-5 h-5 mr-1" /> Dashboard
              </button>
              <button onClick={handleLogout} className="flex items-center px-3 py-2 text-red-500 hover:text-red-700 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 mr-1" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('home')} className="flex items-center px-3 py-2 text-gray-600 hover:text-teal-600 rounded-lg transition-colors">
                <Home className="w-5 h-5 mr-1" /> Home
              </button>
              <button onClick={() => setCurrentPage('contact')} className="flex items-center px-3 py-2 text-gray-600 hover:text-teal-600 rounded-lg transition-colors">
                <Contact className="w-5 h-5 mr-1" /> Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  // Renders the initial home page with an intro message and a single button
  const renderHomePage = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-2xl text-center border-t-8 border-teal-500 animate-slide-in">
        <div className="p-4 inline-block bg-teal-100 rounded-full mb-6">
          <Hospital className="w-16 h-16 text-teal-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">Welcome to HealTrack AI</h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Your partner in autonomous AI-powered hospital management and patient care. Streamlining operations and enhancing healthcare delivery.
        </p>
        <button
          onClick={() => setCurrentPage('role-selection')}
          className="group relative inline-flex items-center px-8 py-4 overflow-hidden text-white bg-teal-600 rounded-full shadow-lg transform transition-all duration-500 hover:scale-105"
        >
          <span className="relative z-10 font-bold transition-all duration-300 group-hover:text-white">Get Started</span>
          <ArrowRight className="ml-3 w-5 h-5 relative z-10 transition-all duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </button>
      </div>
    </div>
  );

  // Renders the role selection page
  const renderRoleSelectionPage = () => (
    <div className="py-20 px-6 max-w-7xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 tracking-tight">Select Your Role</h1>
      <p className="text-lg text-gray-600 mb-12">
        Please select your role to proceed to the relevant dashboard.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <button
          onClick={() => { setSelectedRole('doctor'); setCurrentPage('login-register'); }}
          className="group bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center border-b-4 border-transparent hover:border-teal-500"
        >
          <div className="p-4 rounded-full bg-teal-100 mb-4 transition-colors duration-300 group-hover:bg-teal-200">
            <Stethoscope className="w-16 h-16 text-teal-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Doctor</h2>
        </button>
        <button
          onClick={() => { setSelectedRole('patient'); setCurrentPage('login-register'); }}
          className="group bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center border-b-4 border-transparent hover:border-blue-500"
        >
          <div className="p-4 rounded-full bg-blue-100 mb-4 transition-colors duration-300 group-hover:bg-blue-200">
            <User className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Patient</h2>
        </button>
        <button
          onClick={() => { setSelectedRole('staff'); setCurrentPage('login-register'); }}
          className="group bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center border-b-4 border-transparent hover:border-purple-500"
        >
          <div className="p-4 rounded-full bg-purple-100 mb-4 transition-colors duration-300 group-hover:bg-purple-200">
            <Users className="w-16 h-16 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Staff</h2>
        </button>
        <button
          onClick={() => { setSelectedRole('hospital-admin'); setCurrentPage('login-register'); }}
          className="group bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center border-b-4 border-transparent hover:border-red-500"
        >
          <div className="p-4 rounded-full bg-red-100 mb-4 transition-colors duration-300 group-hover:bg-red-200">
            <Hospital className="w-16 h-16 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Hospital Admin</h2>
        </button>
      </div>
    </div>
  );

  // Renders a simple contact page
  const renderContactPage = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-2xl text-center border-t-8 border-teal-500 animate-slide-in">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          We're here to help. Reach out to us with any questions or feedback.
        </p>
        <div className="text-left text-lg space-y-4">
          <p><span className="font-bold">Email:</span> support@healtrack.com</p>
          <p><span className="font-bold">Phone:</span> +1 (555) 123-4567</p>
          <p><span className="font-bold">Address:</span> 123 Health Blvd, Medico City, 12345</p>
        </div>
      </div>
    </div>
  );

  // Renders the login and registration forms
  const renderLoginRegister = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">{isLoginMode ? 'Login' : 'Register'}</h1>
          <p className="text-gray-500 text-sm mt-1">as a <span className="font-semibold text-gray-700">{selectedRole}</span> account</p>
        </div>
        <form onSubmit={handleAuth}>
          {!isLoginMode && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
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
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              required
            />
          </div>
          {!isLoginMode && (
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Captcha</label>
              <div className="flex items-center space-x-4">
                <div className="p-2 w-28 text-center text-2xl font-extrabold bg-gray-200 text-gray-700 rounded-md select-none">
                  {captchaValue}
                </div>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                  placeholder="Enter code"
                  required
                />
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-md"
          >
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
        {authMessage && (
          <p className="mt-4 text-center text-red-500 text-sm font-medium">{authMessage}</p>
        )}
        <div className="mt-6 text-center">
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

  // Renders the patient dashboard
  const renderPatientDashboard = () => (
    <PatientDashboard user={user} onLogout={handleLogout} />
  );

  // Renders the details page when a card is clicked.
  const renderDetailsPage = () => (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigateToDashboard(user.role)}
        className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Go Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-teal-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">{selectedCard.title} Details</h1>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{selectedCard.description}</p>
        <div className="p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 italic">
            This is a placeholder for the full dashboard view related to {selectedCard.title}.
            You can implement charts, data tables, and other metrics here.
          </p>
        </div>
      </div>
    </div>
  );

  // Renders the patient details page for doctors
  const renderPatientDetailsPage = () => (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigateToDashboard(user.role)}
        className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Go Back to Dashboard</span>
      </button>

      {selectedPatient && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-teal-500">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">{selectedPatient.name}</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-lg">Patient ID:</span>
              <span className="font-mono bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">{selectedPatient.id}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-lg">
            <div><span className="font-semibold text-gray-700">Age:</span> {selectedPatient.age}</div>
            <div><span className="font-semibold text-gray-700">Gender:</span> {selectedPatient.gender}</div>
            <div><span className="font-semibold text-gray-700">Primary Condition:</span> {selectedPatient.condition}</div>
            <div><span className="font-semibold text-gray-700">Blood Type:</span> {selectedPatient.bloodType}</div>
            <div><span className="font-semibold text-gray-700">Allergies:</span> {selectedPatient.allergies.join(', ') || 'None'}</div>
            <div><span className="font-semibold text-gray-700">Admitted:</span> {selectedPatient.admitted}</div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><FileText className="mr-2 text-blue-600"/> Vitals</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {Object.entries(selectedPatient.vitals).map(([key, value]) => (
                  <div key={key} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-500 mb-1">{key.replace(/-/g, ' ').toUpperCase()}</p>
                    <p className="text-xl font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Pill className="mr-2 text-green-600"/> Medications</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {selectedPatient.medications.map((med, index) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Syringe className="mr-2 text-purple-600"/> Medical History</h2>
              <div className="space-y-4">
                {selectedPatient.history.map((record, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 font-semibold mb-1">{record.date}</p>
                    <p className="text-gray-700">{record.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Patient dashboard has been moved to the PatientDashboard component

  // Renders the main dashboard for staff
  const renderStaffDashboard = () => (
    <StaffDashboard></StaffDashboard>
  );

  // Renders the main dashboard for hospital admin
  const renderHospitalDashboard = () => (
    <HospitalDashboard></HospitalDashboard>
  );

  // Renders the main dashboard for doctors
  const renderDoctorDashboard = () => (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16 tracking-tight">Doctor's Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-teal-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Clock className="mr-2 text-purple-600"/> Today's Appointments</h2>
          <ul className="text-left text-gray-700 space-y-4">
            <li className="p-4 bg-gray-50 rounded-lg flex justify-between items-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-teal-500"/>
                <div>
                  <span className="font-semibold text-gray-800">Muskan</span>
                  <p className="text-sm text-gray-500">Cardiology - 10:00 AM</p>
                </div>
              </div>
              <button onClick={() => { setSelectedPatient(MOCK_PATIENTS['Muskan']); setCurrentPage('patient-details'); }} className="text-teal-500 hover:text-teal-700 font-medium text-sm">View Patient</button>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg flex justify-between items-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-teal-500"/>
                <div>
                  <span className="font-semibold text-gray-800">Bhoomi</span>
                  <p className="text-sm text-gray-500">Neurology - 11:30 AM</p>
                </div>
              </div>
              <button onClick={() => { setSelectedPatient(MOCK_PATIENTS['Bhoomi']); setCurrentPage('patient-details'); }} className="text-teal-500 hover:text-teal-700 font-medium text-sm">View Patient</button>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-yellow-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Package className="mr-2 text-yellow-600"/> New Messages & Lab Results</h2>
          <ul className="text-left text-gray-700 space-y-4">
            <li className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-1">From: Lab Services</p>
              <p className="font-medium text-gray-700">New blood work results for John Doe are available.</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-100">
              <p className="text-sm font-semibold text-gray-500 mb-1">From: Nurse Jane</p>
              <p className="font-medium text-gray-700">Patient Aadarsh is requesting a follow-up appointment.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-purple-500 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><ArrowRight className="mr-2 text-purple-600"/> Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(doctorActionCards).map(([key, card]) => (
            <div
              key={key}
              className="group flex flex-col items-start bg-gray-50 rounded-xl p-6 border-l-4 transition-all duration-300 transform hover:scale-105"
              style={{ borderColor: colorMap[card.color].bg.split('-')[1] }} // Dynamic border color
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-3 ${colorMap[card.color].iconBg}`}>
                <card.icon className={`w-6 h-6 ${colorMap[card.color].iconText}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Main rendering logic
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'role-selection':
        return renderRoleSelectionPage();
      case 'login-register':
        return renderLoginRegister();
      case 'staff-dashboard':
        return renderStaffDashboard();
      case 'doctor-dashboard':
        return renderDoctorDashboard();
      case 'patient-dashboard':
        return renderPatientDashboard();
      case 'hospital-dashboard':
        return renderHospitalDashboard();
      case 'details':
        return renderDetailsPage();
      case 'patient-details':
        return renderPatientDetailsPage();
      case 'contact':
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />
      <main className="pt-16">
        {renderCurrentPage()}
      </main>
    </div>
  );
}
