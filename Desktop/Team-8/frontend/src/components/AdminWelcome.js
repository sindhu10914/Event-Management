import React from 'react';
import { Link } from 'react-router-dom';

const AdminWelcome = ({ userName, stats }) => {
  const systemModules = [
    {
      title: 'User Management',
      description: 'Full control over all users',
      icon: '👥',
      link: '/users',
      gradient: 'from-red-500 via-pink-500 to-rose-500',
      stats: [
        { label: 'Total Users', value: stats.totalUsers || 0 },
        { label: 'Active', value: stats.totalUsers || 0 }
      ]
    },
    {
      title: 'Resource Control',
      description: 'Manage all campus resources',
      icon: '📚',
      link: '/resources',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      stats: [
        { label: 'Resources', value: stats.totalResources || 0 },
        { label: 'Available', value: stats.totalResources || 0 }
      ]
    },
    {
      title: 'Booking Oversight',
      description: 'Monitor all booking activities',
      icon: '📅',
      link: '/bookings',
      gradient: 'from-purple-500 via-violet-500 to-indigo-500',
      stats: [
        { label: 'Total', value: stats.totalBookings || 0 },
        { label: 'Pending', value: stats.pendingBookings || 0 }
      ]
    },
    {
      title: 'System Analytics',
      description: 'View detailed reports',
      icon: '📊',
      link: '/dashboard',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      stats: [
        { label: 'Approved', value: stats.approvedBookings || 0 },
        { label: 'This Month', value: stats.approvedBookings || 0 }
      ]
    }
  ];

  const quickStats = [
    { label: 'System Health', value: '100%', icon: '💚', color: 'text-green-600' },
    { label: 'Active Sessions', value: '24', icon: '🔥', color: 'text-orange-600' },
    { label: 'Uptime', value: '99.9%', icon: '⚡', color: 'text-yellow-600' },
    { label: 'Response Time', value: '45ms', icon: '⚙️', color: 'text-blue-600' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 rounded-3xl p-10 text-white mb-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-3">
                <span className="text-6xl mr-4">👑</span>
                <div>
                  <h1 className="text-5xl font-black">ADMIN PORTAL</h1>
                  <p className="text-xl opacity-90 mt-1">System Administrator</p>
                </div>
              </div>
              <p className="text-2xl font-light mt-4">Welcome back, <span className="font-bold">{userName}</span></p>
              <p className="text-sm opacity-75 mt-2">You have full system access and control</p>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-30">
                <p className="text-sm opacity-75">Last Login</p>
                <p className="text-2xl font-bold">Just Now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* System Modules */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-3xl mr-2">🎛️</span>
          System Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemModules.map((module, index) => (
            <Link
              key={index}
              to={module.link}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${module.gradient} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-6 -translate-y-6">
                  {module.icon}
                </div>
                <div className="relative z-10">
                  <div className="text-5xl mb-3">{module.icon}</div>
                  <h3 className="text-2xl font-bold mb-1">{module.title}</h3>
                  <p className="text-sm opacity-90">{module.description}</p>
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  {module.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-red-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚡</span>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-white hover:bg-red-50 text-left p-4 rounded-xl shadow transition-all flex items-center justify-between group">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <span className="font-semibold text-gray-800">Approve All Pending</span>
              </div>
              <span className="text-gray-400 group-hover:text-red-500">→</span>
            </button>
            <button className="w-full bg-white hover:bg-red-50 text-left p-4 rounded-xl shadow transition-all flex items-center justify-between group">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📝</span>
                <span className="font-semibold text-gray-800">Generate Report</span>
              </div>
              <span className="text-gray-400 group-hover:text-red-500">→</span>
            </button>
            <button className="w-full bg-white hover:bg-red-50 text-left p-4 rounded-xl shadow transition-all flex items-center justify-between group">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔧</span>
                <span className="font-semibold text-gray-800">System Settings</span>
              </div>
              <span className="text-gray-400 group-hover:text-red-500">→</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">🔐</span>
            Admin Privileges
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur">
              <span className="text-green-400 text-xl mr-3">✓</span>
              <span className="text-sm">Full User Management Access</span>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur">
              <span className="text-green-400 text-xl mr-3">✓</span>
              <span className="text-sm">Resource Creation & Deletion</span>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur">
              <span className="text-green-400 text-xl mr-3">✓</span>
              <span className="text-sm">Booking Override Authority</span>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur">
              <span className="text-green-400 text-xl mr-3">✓</span>
              <span className="text-sm">System Configuration Control</span>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg backdrop-blur">
              <span className="text-green-400 text-xl mr-3">✓</span>
              <span className="text-sm">Analytics & Reporting Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcome;
