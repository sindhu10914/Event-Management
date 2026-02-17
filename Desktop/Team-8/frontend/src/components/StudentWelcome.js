import React from 'react';
import { Link } from 'react-router-dom';

const StudentWelcome = ({ userName }) => {
  const quickActions = [
    {
      title: 'Browse Resources',
      description: 'Explore available campus resources',
      icon: '📚',
      link: '/resources',
      color: 'bg-blue-500'
    },
    {
      title: 'My Bookings',
      description: 'View and manage your bookings',
      icon: '📅',
      link: '/bookings',
      color: 'bg-green-500'
    },
    {
      title: 'Create Booking',
      description: 'Book a new resource',
      icon: '➕',
      link: '/bookings',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
        <p className="text-lg opacity-90">Ready to manage your campus resources?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📋</span>
            How to Book Resources
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">1</span>
              <span>Browse available resources from the Resources page</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">2</span>
              <span>Click "New Booking" and select your resource</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">3</span>
              <span>Choose date, time, and provide purpose</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">4</span>
              <span>Wait for staff approval</span>
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            Quick Tips
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Book resources in advance to ensure availability</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Check your booking status regularly</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Provide clear purpose for faster approval</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Cancel bookings you no longer need</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentWelcome;
