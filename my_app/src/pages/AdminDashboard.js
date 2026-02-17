import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashboardRes, usersRes, eventsRes] = await Promise.all([
        api.get('/dashboard/admin/'),
        api.get('/users/'),
        api.get('/events/')
      ]);
      
      setStats(dashboardRes.data);
      setUsers(usersRes.data.results || usersRes.data);
      setEvents(eventsRes.data.results || eventsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/approve/`);
      fetchDashboardData();
    } catch (error) {
      alert('Failed to approve event');
    }
  };

  const handleRejectEvent = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/reject/`);
      fetchDashboardData();
    } catch (error) {
      alert('Failed to reject event');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.patch(`/users/${userId}/`, { is_active: !currentStatus });
      fetchDashboardData();
    } catch (error) {
      alert('Failed to update user status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 ${activeTab === 'events' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Events
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && stats && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-3xl font-bold text-primary">{stats.total_users}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total Events</h3>
              <p className="text-3xl font-bold text-green-600">{stats.total_events}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.total_bookings}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Total Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">${stats.total_revenue}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Pending Events</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending_events}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm">Approved Events</h3>
              <p className="text-3xl font-bold text-green-600">{stats.approved_events}</p>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Reference</th>
                    <th className="text-left py-2">User</th>
                    <th className="text-left py-2">Event</th>
                    <th className="text-left py-2">Seats</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_bookings.map(booking => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-2">{booking.booking_reference}</td>
                      <td className="py-2">{booking.user_email}</td>
                      <td className="py-2">{booking.event_name}</td>
                      <td className="py-2">{booking.seats_booked}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          booking.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.payment_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">{user.role}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => handleToggleUserStatus(user.id, user.is_active)}
                        className={`px-3 py-1 rounded text-sm ${
                          user.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{event.event_name}</h3>
                    <p className="text-gray-600">{event.location} - {event.date}</p>
                    <p className="text-sm">Organizer: {event.organizer_name}</p>
                    <p className="text-sm">
                      Status: <span className={`font-semibold ${
                        event.status === 'approved' ? 'text-green-600' :
                        event.status === 'rejected' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>{event.status.toUpperCase()}</span>
                    </p>
                  </div>
                  {event.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveEvent(event.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectEvent(event.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
