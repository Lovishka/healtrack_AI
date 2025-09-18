import React, { useState } from 'react';
import { BarChart, CheckCircle, Clock, DollarSign, Stethoscope, Heart, FlaskConical, UserPlus, BedDouble, Hospital, Phone, Mail, ArrowLeft, Calendar, CheckCircle as CheckCircleIcon, MessageCircle, X } from 'lucide-react';

// Mock patient data updated with Indian names and INR currency
const patientData = {
  name: "Priya Singh",
  status: "In-patient, recovering well",
  diagnosis: "Post-op care for Appendectomy",
  estimatedDischarge: "Tomorrow, 2:00 PM",
  dischargeChecklist: [
    { task: "Final Doctor Consultation", completed: false },
    { task: "Review Post-Op Instructions", completed: false },
    { task: "Complete Discharge Paperwork", completed: false },
    { task: "Arrange Transportation", completed: true },
    { task: "Pick up Prescriptions", completed: true },
  ],
  billing: {
    totalBill: 57500.00,
    paid: 32500.00,
    remaining: 25000.00,
  },
  reports: [
    { id: 1, title: 'Lab Test Results', date: '2024-09-17' },
    { id: 2, title: 'Surgery Summary Report', date: '2024-09-15' },
    { id: 3, title: 'Radiology Report', date: '2024-09-15' },
  ],
};

// Mock data for new features
const doctorsData = {
  cardiology: [
    { name: 'Dr. Alok Sharma', specialty: 'Cardiologist', status: 'Available', photo: 'https://placehold.co/100x100/A0E7E5/000?text=AS', bio: 'Dr. Sharma is a renowned cardiologist with over 15 years of experience in cardiac rhythm management and interventional cardiology. He is dedicated to providing compassionate and comprehensive care to all his patients.', experience: '15+ years', contact: 'alok.sharma@hospital.com' },
    { name: 'Dr. Priya Singhania', specialty: 'Cardiologist', status: 'In-consult', photo: 'https://placehold.co/100x100/F4C2C2/000?text=PS', bio: 'Dr. Singhania focuses on preventive cardiology and advanced heart failure treatment. She is a strong advocate for patient education and lifestyle changes to improve cardiovascular health.', experience: '10+ years', contact: 'priya.singhania@hospital.com' },
  ],
  physician: [
    { name: 'Dr. Karanjeet Singh', specialty: 'General Physician', status: 'Available', photo: 'https://placehold.co/100x100/98C1D9/000?text=KS', bio: 'Dr. Singh is an expert in general medicine with a focus on chronic disease management and diagnostic medicine. His patient-first approach ensures thorough and accurate care.', experience: '12 years', contact: 'karanjeet.singh@hospital.com' },
    { name: 'Dr. Anjali Verma', specialty: 'General Physician', status: 'Available', photo: 'https://placehold.co/100x100/C0E6BA/000?text=AV', bio: 'Dr. Verma is known for her holistic approach to healthcare, integrating modern medicine with a strong emphasis on well-being and mental health. She excels in treating common ailments and providing long-term care.', experience: '8 years', contact: 'anjali.verma@hospital.com' },
  ],
  endocrine: [
    { name: 'Dr. Ritu Saxena', specialty: 'Endocrinologist', status: 'Available', photo: 'https://placehold.co/100x100/FFE4B2/000?text=RS', bio: 'Dr. Saxena specializes in treating hormonal disorders, including diabetes, thyroid issues, and metabolic syndrome. She uses the latest research to provide personalized and effective treatment plans.', experience: '14 years', contact: 'ritu.saxena@hospital.com' },
    { name: 'Dr. Sanjay Gupta', specialty: 'Endocrinologist', status: 'Off-duty', photo: 'https://placehold.co/100x100/E0BBE4/000?text=SG', bio: 'Dr. Gupta is a leading endocrinologist with a passion for research and clinical excellence. His work has helped countless patients manage complex endocrine conditions.', experience: '20+ years', contact: 'sanjay.gupta@hospital.com' },
  ],
};

const hospitalsData = [
    {
      name: 'Kailash Hospital',
      distance: '5 km',
      beds: [
        { type: 'General Ward', total: 50, occupied: 35, price: 5000 },
        { type: 'ICU', total: 15, occupied: 10, price: 15000 },
        { type: 'Pediatric Ward', total: 20, occupied: 12, price: 6000 },
      ],
    },
    {
      name: 'Fortis Hospital',
      distance: '8 km',
      beds: [
        { type: 'General Ward', total: 70, occupied: 50, price: 6500 },
        { type: 'ICU', total: 25, occupied: 20, price: 20000 },
        { type: 'Maternity Ward', total: 15, occupied: 5, price: 7500 },
      ],
    },
];

const PatientDashboard = () => {
  const [view, setView] = useState('options');
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  const [billStatus, setBillStatus] = useState(patientData.billing.remaining > 0 ? 'pending' : 'paid');

  // New state for AI Assistant
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { text: `Hello ${patientData.name}! I am your personal AI assistant. How can I help you today?`, sender: 'ai' }
  ]);
  const [aiStep, setAiStep] = useState('initial');

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const date = e.target.appointmentDate.value;
    const time = e.target.appointmentTime.value;
    setAppointmentDetails({
      doctor: selectedDoctor,
      date,
      time,
    });
    setView('bookingConfirmation');
  };
  
  const handleAdmissionFormSubmit = (e) => {
    e.preventDefault();
    setView('admissionConfirmation');
  };

  const handlePayBill = () => {
    // Simulate payment process
    setTimeout(() => {
      setBillStatus('paid');
      patientData.billing.paid += patientData.billing.remaining;
      patientData.billing.remaining = 0;
      setView('dischargeConfirmation');
    }, 1500);
  };

  // Function to handle AI assistant actions
  const handleAiAction = (action) => {
    switch (action) {
      case 'book_appointment':
        setAiMessages(prev => [...prev, { text: "Sure, let's book an appointment. Which department would you like to consult?", sender: 'ai' }]);
        setView('consultDomains');
        setAiMode(false); // Close AI chat after action
        break;
      case 'emergency_admission':
        setAiMessages(prev => [...prev, { text: "I can help with that. Showing you available beds in nearby hospitals.", sender: 'ai' }]);
        setView('emergency');
        setAiMode(false); // Close AI chat after action
        break;
      case 'pay_bill':
        setAiMessages(prev => [...prev, { text: "Okay, let's get your bill sorted. Taking you to the billing section now.", sender: 'ai' }]);
        setView('dischargeProcess');
        setAiMode(false); // Close AI chat after action
        break;
      case 'view_dashboard':
        setAiMessages(prev => [...prev, { text: "Of course! Let's take a look at your dashboard.", sender: 'ai' }]);
        setView('dashboard');
        setAiMode(false); // Close AI chat after action
        break;
      default:
        setAiMessages(prev => [...prev, { text: "I'm sorry, I didn't understand that. How can I help you?", sender: 'ai' }]);
        break;
    }
  };

  const renderOptionsView = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome, {patientData.name}</h1>
        <p className="text-lg text-gray-600 text-center">How can we help you today?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <button
                onClick={() => setView('consultDomains')}
                className="bg-blue-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 hover:bg-blue-700 transition-colors"
            >
                <Stethoscope className="w-12 h-12" />
                <span className="text-xl font-bold">Consult a Doctor</span>
            </button>
            <button
                onClick={() => setView('emergency')}
                className="bg-red-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 hover:bg-red-700 transition-colors"
            >
                <Hospital className="w-12 h-12" />
                <span className="text-xl font-bold">Emergency</span>
            </button>
            <button
                onClick={() => setView('dashboard')}
                className="bg-gray-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-3 hover:bg-gray-700 transition-colors md:col-span-2"
            >
                <BarChart className="w-12 h-12" />
                <span className="text-xl font-bold">View Dashboard</span>
            </button>
        </div>
    </div>
);

  const renderConsultDomains = () => (
    <div className="w-full">
        <button onClick={() => setView('options')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Domain to Consult</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={() => { setSelectedDomain('cardiology'); setView('doctorList'); }} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors">
                <Heart className="w-8 h-8 text-red-500" />
                <span className="font-semibold">Cardiology</span>
            </button>
            <button onClick={() => { setSelectedDomain('endocrine'); setView('doctorList'); }} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors">
                <FlaskConical className="w-8 h-8 text-purple-500" />
                <span className="font-semibold">Endocrine</span>
            </button>
            <button onClick={() => { setSelectedDomain('physician'); setView('doctorList'); }} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 hover:bg-gray-50 transition-colors">
                <Stethoscope className="w-8 h-8 text-green-500" />
                <span className="font-semibold">General Physician</span>
            </button>
        </div>
    </div>
);

  const renderDoctorList = () => (
    <div className="w-full">
        <button onClick={() => setView('consultDomains')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Domains
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 my-4 capitalize">Available {selectedDomain} Doctors</h3>
        <div className="space-y-4">
            {doctorsData[selectedDomain].map((doctor, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
                    <img src={doctor.photo} alt={doctor.name} className="w-20 h-20 rounded-full object-cover" />
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-bold text-gray-900">{doctor.name}</h4>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${doctor.status === 'Available' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                            {doctor.status}
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                        <button
                            onClick={() => { setSelectedDoctor(doctor); setView('doctorProfile'); }}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors w-full md:w-auto"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => { setSelectedDoctor(doctor); setView('bookAppointment'); }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

  const renderDoctorProfile = () => (
    <div className="w-full">
        <button onClick={() => setView('doctorList')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Doctors
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="w-40 h-40 rounded-full object-cover shadow-md" />
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                <p className="text-xl text-gray-600">{selectedDoctor.specialty}</p>
                <p className="text-sm font-semibold text-gray-500 mt-1">Experience: {selectedDoctor.experience}</p>
                <p className="mt-4 text-gray-700 leading-relaxed">{selectedDoctor.bio}</p>
                <div className="mt-6 space-y-2 text-gray-600">
                    <p className="flex items-center justify-center md:justify-start space-x-2">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span>{selectedDoctor.contact}</span>
                    </p>
                </div>
                <button
                    onClick={() => setView('bookAppointment')}
                    className="mt-6 w-full md:w-auto py-3 px-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    </div>
);

  const renderBookAppointment = () => (
    <div className="w-full">
        <button onClick={() => setView('doctorProfile')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h3>
            <p className="text-gray-600 mb-6">with {selectedDoctor.name}, {selectedDoctor.specialty}</p>

            <form className="space-y-6" onSubmit={handleBookAppointment}>
                <div>
                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Select Date</label>
                    <input type="date" id="appointmentDate" name="appointmentDate" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <div>
                    <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Select Time</label>
                    <input type="time" id="appointmentTime" name="appointmentTime" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                    <Calendar className="w-5 h-5" />
                    <span>Confirm Booking</span>
                </button>
            </form>
        </div>
    </div>
);

  const renderBookingConfirmation = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-lg shadow-lg max-w-lg mx-auto">
        <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h2>
        <p className="text-lg text-gray-600">Thank you for booking with us. Your appointment details are below. We've sent a confirmation email to your registered address.</p>
        <div className="w-full bg-gray-50 p-6 rounded-lg border border-gray-200 text-left space-y-3">
            <div className="flex items-center space-x-3">
                <Stethoscope className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Doctor:</span>
                <span>{appointmentDetails.doctor.name}</span>
            </div>
            <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Date:</span>
                <span>{new Date(appointmentDetails.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Time:</span>
                <span>{appointmentDetails.time}</span>
            </div>
        </div>
        <button
            onClick={() => setView('options')}
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
            Return to Dashboard
        </button>
    </div>
);

  const renderEmergencyView = () => (
    <div className="w-full">
        <button onClick={() => setView('options')} className="mb-6 flex items-center text-red-600 hover:text-red-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Hospitals and Beds</h2>
        <p className="text-gray-600 mb-6">Showing nearest hospitals with available beds.</p>
        <div className="space-y-6">
            {hospitalsData.map((hospital, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{hospital.name}</h3>
                        <span className="text-lg text-gray-600">{hospital.distance} away</span>
                    </div>
                    <ul className="space-y-4">
                        {hospital.beds.map((bed, bedIndex) => (
                            <li key={bedIndex} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                <div>
                                    <h4 className="font-medium text-lg text-gray-800">{bed.type}</h4>
                                    <p className="text-sm text-gray-500">Available: <span className="text-green-600 font-semibold">{bed.total - bed.occupied}</span> / {bed.total}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">₹{bed.price.toLocaleString()} / night</p>
                                    <button
                                      onClick={() => { setSelectedHospital(hospital); setSelectedBed(bed); setView('emergencyAdmissionForm'); }}
                                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                      Admit Now
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  );

  const renderEmergencyAdmissionForm = () => (
    <div className="w-full">
      <button onClick={() => setView('emergency')} className="mb-6 flex items-center text-red-600 hover:text-red-800 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Hospitals
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Emergency Admission Form</h3>
        <p className="text-gray-600 mb-6">Admitting to: {selectedHospital.name} ({selectedBed.type})</p>
        <form className="space-y-6" onSubmit={handleAdmissionFormSubmit}>
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="patientName" name="patientName" placeholder="e.g., Ramesh Kumar" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input type="tel" id="contactNumber" name="contactNumber" placeholder="e.g., +91 9876543210" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea id="address" name="address" rows="3" placeholder="e.g., 123, Gandhi Street, New Delhi" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" required></textarea>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="consent" name="consent" className="rounded text-red-600 focus:ring-red-500" required />
            <label htmlFor="consent" className="text-sm font-medium text-gray-700">I consent to the admission and understand the hospital's terms and conditions.</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Confirm Admission</span>
          </button>
        </form>
      </div>
    </div>
  );

  const renderAdmissionConfirmation = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-lg shadow-lg max-w-lg mx-auto">
        <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800">Admission Confirmed!</h2>
        <p className="text-lg text-gray-600">The hospital has been notified and is expecting your arrival. Please proceed to the emergency department immediately.</p>
        <div className="w-full bg-gray-50 p-6 rounded-lg border border-gray-200 text-left space-y-3">
            <div className="flex items-center space-x-3">
                <Hospital className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Hospital:</span>
                <span>{selectedHospital.name}</span>
            </div>
            <div className="flex items-center space-x-3">
                <BedDouble className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Bed Type:</span>
                <span>{selectedBed.type}</span>
            </div>
            <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Emergency Helpline:</span>
                <span>+91-11-23456789</span>
            </div>
        </div>
        <button
            onClick={() => setView('options')}
            className="mt-6 w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
            Return to Dashboard
        </button>
    </div>
  );

  const renderDischargeProcess = () => (
    <div className="w-full">
      <button onClick={() => setView('dashboard')} className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
      </button>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Discharge Process</h3>
        <p className="text-gray-600 mb-6">Complete the payment to finalize your discharge.</p>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Bill:</span>
            <span className="font-medium text-gray-900">₹{patientData.billing.totalBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium text-green-600">₹{patientData.billing.paid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
            <span className="text-gray-800">Remaining Balance:</span>
            <span className="text-red-600">₹{patientData.billing.remaining.toFixed(2)}</span>
          </div>
        </div>

        {billStatus === 'pending' ? (
          <button
            onClick={handlePayBill}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <DollarSign className="w-5 h-5" />
            <span>Pay ₹{patientData.billing.remaining.toFixed(2)} Now</span>
          </button>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-xl font-semibold text-green-600">Payment Complete!</p>
            <p className="text-gray-700">Your discharge process is finalized. You can now leave the hospital. We wish you a speedy recovery.</p>
            <button
              onClick={() => setView('options')}
              className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderOriginalDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <BarChart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Current Status</p>
            <h2 className="text-xl font-bold text-gray-800">{patientData.status}</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Estimated Discharge</p>
            <h2 className="text-xl font-bold text-gray-800">{patientData.estimatedDischarge}</h2>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Remaining Bill</p>
            <h2 className="text-xl font-bold text-gray-800">₹{patientData.billing.remaining.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Discharge Checklist</h2>
          <ul className="space-y-4">
            {patientData.dischargeChecklist.map((item, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className={`flex-shrink-0 ${item.completed ? 'text-green-500' : 'text-gray-400'}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className={`text-gray-700 ${item.completed ? 'line-through' : ''}`}>
                  {item.task}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Bill:</span>
              <span className="font-medium text-gray-900">₹{patientData.billing.totalBill.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium text-green-600">₹{patientData.billing.paid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-4">
              <span className="text-gray-800">Remaining Balance:</span>
              <span className="text-red-600">₹{patientData.billing.remaining.toFixed(2)}</span>
            </div>
          </div>
          <button onClick={() => setView('dischargeProcess')} className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Initiate Discharge Process
          </button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Reports</h2>
        <ul className="space-y-4">
          {patientData.reports.map((report) => (
            <li key={report.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500">Date: {report.date}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-900 font-bold">
                View Report
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  // AI Chat component
  const renderAiChat = () => (
    <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-2xl">
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <button onClick={() => setIsAiMode(false)} className="text-white hover:text-gray-100">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
        {aiMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'ai' ? 'bg-gray-200 text-gray-800 rounded-bl-none' : 'bg-blue-500 text-white rounded-br-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Quick Actions:</h4>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => handleAiAction('book_appointment')} className="bg-gray-100 text-gray-800 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
            Book an Appointment
          </button>
          <button onClick={() => handleAiAction('emergency_admission')} className="bg-gray-100 text-gray-800 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
            Emergency Admission
          </button>
          <button onClick={() => handleAiAction('pay_bill')} className="bg-gray-100 text-gray-800 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
            Pay My Bill
          </button>
          <button onClick={() => handleAiAction('view_dashboard')} className="bg-gray-100 text-gray-800 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'options':
        return renderOptionsView();
      case 'consultDomains':
        return renderConsultDomains();
      case 'doctorList':
        return renderDoctorList();
      case 'doctorProfile':
        return renderDoctorProfile();
      case 'bookAppointment':
        return renderBookAppointment();
      case 'bookingConfirmation':
        return renderBookingConfirmation();
      case 'emergency':
        return renderEmergencyView();
      case 'emergencyAdmissionForm':
        return renderEmergencyAdmissionForm();
      case 'admissionConfirmation':
        return renderAdmissionConfirmation();
      case 'dischargeProcess':
        return renderDischargeProcess();
      case 'dischargeConfirmation':
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-6 bg-white p-10 rounded-lg shadow-lg max-w-lg mx-auto">
            <CheckCircleIcon className="w-20 h-20 text-green-500 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-800">Discharge Complete!</h2>
            <p className="text-lg text-gray-600">Your payment has been successfully processed. You are now officially discharged. We wish you a quick and full recovery.</p>
            <button
                onClick={() => setView('options')}
                className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
                Return to Dashboard
            </button>
          </div>
        );
      case 'dashboard':
        return (
          <div>
            <button onClick={() => setView('options')} className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome, {patientData.name}</h1>
            <p className="text-lg text-gray-600 mb-8">Here's a summary of your hospital stay.</p>
            {renderOriginalDashboard()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
      
      {/* AI Toggle Button */}
      <button 
        onClick={() => setIsAiMode(!isAiMode)} 
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50"
        aria-label="Toggle AI Assistant"
      >
        <MessageCircle size={28} />
      </button>

      {/* AI Chat Window */}
      {isAiMode && renderAiChat()}
    </div>
  );
};

export default PatientDashboard;
