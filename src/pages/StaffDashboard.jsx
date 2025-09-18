import React from 'react';
import { Truck, Sparkles, Wrench, FileText } from 'lucide-react';

const staffData = {
  tasks: {
    medicineDeliveries: [
      { id: 1, ward: 'ICU', status: 'Pending', time: '10:00 AM' },
      { id: 2, ward: 'Pediatrics', status: 'In Progress', time: '11:30 AM' },
      { id: 3, ward: 'Maternity', status: 'Completed', time: '09:45 AM' },
    ],
    roomCleaning: [
      { id: 1, room: '201', status: 'Pending', type: 'Daily Clean' },
      { id: 2, room: '305', status: 'In Progress', type: 'Deep Clean' },
      { id: 3, room: '110', status: 'Completed', type: 'Patient Discharge' },
    ],
    maintenance: [
      { id: 1, area: 'Operating Room 3', issue: 'Faulty light fixture', status: 'Pending' },
      { id: 2, area: 'Elevator 2', issue: 'Maintenance required', status: 'In Progress' },
    ],
  },
  reports: [
    { id: 1, title: 'Weekly Medicine Usage Report', date: '2025-09-15', status: 'Generated' },
    { id: 2, title: 'Monthly Maintenance Summary', date: '2025-09-10', status: 'Awaiting Approval' },
  ],
};

const StaffDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Staff Dashboard</h1>
        
        {/* Task Management Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Medicine Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Medicine Delivery</h2>
            </div>
            <ul className="space-y-4">
              {staffData.tasks.medicineDeliveries.map(task => (
                <li key={task.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Ward: {task.ward}</p>
                    <p className="text-sm text-gray-500">Status: {task.status}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Room Cleaning */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Room Cleaning</h2>
            </div>
            <ul className="space-y-4">
              {staffData.tasks.roomCleaning.map(task => (
                <li key={task.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Room: {task.room}</p>
                    <p className="text-sm text-gray-500">Type: {task.type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Maintenance */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-full">
                <Wrench className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Maintenance</h2>
            </div>
            <ul className="space-y-4">
              {staffData.tasks.maintenance.map(task => (
                <li key={task.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Area: {task.area}</p>
                    <p className="text-sm text-gray-500">Issue: {task.issue}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <hr className="my-10 border-gray-300" />

        {/* Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffData.reports.map(report => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === 'Generated' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 font-bold">View Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;