import React, { useState } from 'react';
import { FaBed, FaUserPlus, FaCheckCircle, FaHospitalUser, FaSearch, FaTimes, FaHeartbeat, FaChild, FaStethoscope, FaHospital, FaUserEdit, FaSave, FaFileUpload } from 'react-icons/fa';

// Reusable Card Component (remains the same)
const Card = ({ icon, title, value, color, totalValue }) => {
  const isBedsCard = title === "Beds Available";
  const percentage = isBedsCard ? ((totalValue - value) / totalValue) * 100 : null;
  return (
    <div className={`flex items-center p-6 bg-white rounded-xl shadow-md border border-${color}-200 
                    transform transition duration-300 hover:scale-105 hover:shadow-lg`}>
      <div className={`mr-4 ${isBedsCard ? 'w-16 h-16' : ''}`}>
        {isBedsCard ? (
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={`text-${color}-500 transition-all duration-700 ease-out`}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={(2 * Math.PI * 40) - (2 * Math.PI * 40 * (percentage / 100))}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <text
                x="50"
                y="50"
                className="text-lg font-bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="#333"
              >
                {Math.round(100 - percentage)}%
              </text>
            </svg>
          </div>
        ) : (
          <div className={`text-4xl text-${color}-500`}>{icon}</div>
        )}
      </div>
      <div>
        <h2 className="text-sm uppercase font-semibold text-gray-500">{title}</h2>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

// Main HospitalDashboard Component
const HospitalDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    bedsAvailable: 25,
    bedsAssigned: 75,
    newAdmissions: 8,
    pendingBookings: 3,
    totalBeds: 100
  });

  const [bedStatus, setBedStatus] = useState({
    icu: { total: 10, occupied: 8, color: 'blue', icon: <FaHeartbeat /> },
    generalWard: { total: 80, occupied: 55, color: 'green', icon: <FaStethoscope /> },
    pediatrics: { total: 15, occupied: 12, color: 'yellow', icon: <FaChild /> },
  });

  const [patientQueue, setPatientQueue] = useState([
    { id: 'P101', name: 'Mamta Devi', status: 'Pending Approval', unit: 'General Ward' },
    { id: 'P102', name: 'Ram Swarup', status: 'Pending Approval', unit: 'ICU' },
  ]);

  const [userProfile, setUserProfile] = useState({
    name: "Mr.Manager",
    phone: "(0512) 555-7723",
    email: "city.j@hospital.com",
    department: "Emergency Medicine",
    specialty: "Critical Care"
  });

  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // New state for saving status
  const [updateFormData, setUpdateFormData] = useState(userProfile); // New state for form data
  const [newPatientName, setNewPatientName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const hospitalProfile = {
    name: "Kailash Hospital",
    address: "Greater Noida",
    phone: "(555) 986-4567",
    email: "contact@kailash.com",
    established: "1985",
    description: "Kailash Hospital is a leading healthcare provider committed to delivering compassionate and high-quality care to our community. We specialize in emergency services, maternity, and various surgical procedures."
  };

  const approveBooking = async (patientId) => {
    try {
      console.log(`Sending approval for patient ${patientId}...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const approvedPatient = patientQueue.find(p => p.id === patientId);
      if (!approvedPatient) return;
      setPatientQueue(prevQueue => prevQueue.filter(p => p.id !== patientId));
      setDashboardData(prevData => ({
        ...prevData,
        bedsAvailable: prevData.bedsAvailable - 1,
        bedsAssigned: prevData.bedsAssigned + 1,
        pendingBookings: prevData.pendingBookings - 1
      }));
      setBedStatus(prevStatus => {
        const unit = approvedPatient.unit.toLowerCase().replace(/\s/g, '');
        if (prevStatus[unit]) {
          return {
            ...prevStatus,
            [unit]: {
              ...prevStatus[unit],
              occupied: prevStatus[unit].occupied + 1
            }
          };
        }
        return prevStatus;
      });
    } catch (error) {
      console.error('API call failed:', error);
      alert('An error occurred while approving the booking.');
    }
  };

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (newPatientName.trim() === '') return;
    const newPatientId = `P${Math.floor(Math.random() * 1000)}`;
    const newPatient = {
      id: newPatientId,
      name: newPatientName,
      status: 'Pending Approval',
      unit: 'General Ward'
    };
    setPatientQueue(prevQueue => [...prevQueue, newPatient]);
    setDashboardData(prevData => ({
      ...prevData,
      pendingBookings: prevData.pendingBookings + 1
    }));
    setNewPatientName('');
    setShowNewBookingModal(false);
  };
  
  // Handlers for the "Update Profile" modal
  const handleUpdateProfileChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      console.log('Updating profile with data:', updateFormData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUserProfile(updateFormData); // Update the main profile state
      alert('Profile updated successfully!');
      setShowUpdateProfileModal(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const filteredPatients = patientQueue.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Hospital Bed Dashboard</h1>
            <p className="text-lg text-gray-500">Real-time overview of bed availability and patient status</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setUpdateFormData(userProfile); // Pre-fill form with current data
                setShowUpdateProfileModal(true);
              }}
              className="flex items-center bg-gray-200 text-gray-800 font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-gray-300 transition duration-300"
            >
              <FaUserEdit className="mr-2" /> Update Profile
            </button>
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center bg-gray-200 text-gray-800 font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-gray-300 transition duration-300"
            >
              <FaHospital className="mr-2" /> Hospital Profile
            </button>
          </div>
        </header>

        {/* The rest of the dashboard components (Cards, Bed Status, Patient Queue) remain the same. */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card
            icon={<FaBed />}
            title="Beds Available"
            value={dashboardData.bedsAvailable}
            totalValue={dashboardData.totalBeds}
            color="blue"
          />
          <Card
            icon={<FaUserPlus />}
            title="New Admissions"
            value={dashboardData.newAdmissions}
            color="green"
          />
          <Card
            icon={<FaCheckCircle />}
            title="Pending Bookings"
            value={dashboardData.pendingBookings}
            color="yellow"
          />
          <Card
            icon={<FaHospitalUser />}
            title="Beds Assigned"
            value={dashboardData.bedsAssigned}
            color="indigo"
          />
        </section>

        <section className="p-6 bg-gray-50 rounded-xl shadow-inner mb-10 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Bed Status by Unit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(bedStatus).map(([unit, data]) => (
              <div
                key={unit}
                className={`p-6 bg-white rounded-lg shadow-md border border-${data.color}-200 transform transition-transform duration-200 hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold capitalize text-gray-800">{unit.replace(/([A-Z])/g, ' $1')}</h4>
                  <div className={`text-3xl text-${data.color}-500`}>{data.icon}</div>
                </div>
                <p className="text-4xl font-extrabold text-gray-900">{data.total - data.occupied}</p>
                <p className="text-sm font-semibold text-gray-500 mt-1">Available Beds</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className={`h-2.5 rounded-full bg-${data.color}-500 transition-all duration-500`}
                    style={{ width: `${(data.occupied / data.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{data.occupied} / {data.total} Occupied</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Bookings Awaiting Approval</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowNewBookingModal(true)}
                className="flex items-center bg-green-600 text-white font-bold py-2.5 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
              >
                <FaUserPlus className="mr-2" /> New Booking
              </button>
            </div>
          </div>

          {filteredPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map(patient => (
                <div key={patient.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{patient.name}</h4>
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{patient.unit}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{patient.status}</p>
                  <button
                    onClick={() => approveBooking(patient.id)}
                    className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                  >
                    Approve Booking
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6 text-lg">
              🎉 All clear! No bookings awaiting approval.
            </p>
          )}
        </section>
      </div>

      {/* New Patient Modal */}
      {showNewBookingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold">New Booking</h2>
              <button onClick={() => setShowNewBookingModal(false)}>
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleAddPatientSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Patient Name</label>
                <input
                  type="text"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewBookingModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hospital Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Hospital Profile</h2>
              <button onClick={() => setShowProfileModal(false)}>
                <FaTimes className="text-gray-400 hover:text-gray-600 text-2xl" />
              </button>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Hospital Name:</span> {hospitalProfile.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Address:</span> {hospitalProfile.address}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Phone:</span> {hospitalProfile.phone}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Email:</span> {hospitalProfile.email}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-900">Established:</span> {hospitalProfile.established}
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-2">About Us</h3>
                <p className="text-gray-600 leading-relaxed">{hospitalProfile.description}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowProfileModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Update Profile Modal (integrated directly) */}
      {showUpdateProfileModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl transform scale-100 transition-all duration-300">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Update Profile</h2>
              <button onClick={() => setShowUpdateProfileModal(false)} disabled={isSaving}>
                <FaTimes className="text-gray-400 hover:text-gray-600 text-2xl" />
              </button>
            </div>
            <form onSubmit={handleUpdateProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Personal Information</h3>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={updateFormData.name}
                      onChange={handleUpdateProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      value={updateFormData.phone}
                      onChange={handleUpdateProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={updateFormData.email}
                      onChange={handleUpdateProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Professional Information</h3>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="department">Department</label>
                    <input
                      id="department"
                      type="text"
                      name="department"
                      value={updateFormData.department}
                      onChange={handleUpdateProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1" htmlFor="specialty">Specialty</label>
                    <input
                      id="specialty"
                      type="text"
                      name="specialty"
                      value={updateFormData.specialty}
                      onChange={handleUpdateProfileChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                      <FaFileUpload className="mr-2" /> Upload New Credentials
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateProfileModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
