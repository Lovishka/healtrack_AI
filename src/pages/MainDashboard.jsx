import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Users, User, Hospital } from 'lucide-react';

const options = [
  { title: "Doctor", icon: Stethoscope, path: "/dashboard/doctor", color: "blue" },
  { title: "Staff", icon: Users, path: "/dashboard/staff", color: "green" },
  { title: "Patient", icon: User, path: "/dashboard/patient", color: "purple" },
  { title: "Hospitals", icon: Hospital, path: "/hospital-dashboard", color: "teal" },
];

const MainDashboard = () => {
  const navigate = useNavigate();

  const colorClasses = {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    green: "bg-green-600 text-white hover:bg-green-700",
    purple: "bg-purple-600 text-white hover:bg-purple-700",
    teal: "bg-teal-600 text-white hover:bg-teal-700",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">Select Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {options.map((option, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            onClick={() => navigate(option.path)}
          >
            <div className={`p-4 rounded-full mb-4 ${colorClasses[option.color]}`}>
              <option.icon className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{option.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;


