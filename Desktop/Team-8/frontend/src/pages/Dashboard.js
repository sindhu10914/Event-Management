import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StudentWelcome from '../components/StudentWelcome';
import StaffWelcome from '../components/StaffWelcome';
import AdminWelcome from '../components/AdminWelcome';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI, resourcesAPI, usersAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    totalResources: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const promises = [
        bookingsAPI.getAll(),
        resourcesAPI.getAll(),
      ];

      if (user?.role === 'staff') {
        promises.push(usersAPI.getAll());
      }

      const responses = await Promise.all(promises);
      const bookings = responses[0].data;
      const resources = responses[1].data;
      const users = responses[2]?.data || [];

      setStats({
        totalBookings: bookings.length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        approvedBookings: bookings.filter(b => b.status === 'approved').length,
        totalResources: resources.length,
        totalUsers: users.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  // Show welcome framework for students
  if (user?.role === 'student') {
    return (
      <Layout>
        <StudentWelcome userName={user?.name} />
      </Layout>
    );
  }

  // Show admin portal framework
  if (user?.role === 'admin') {
    return (
      <Layout>
        <AdminWelcome userName={user?.name} stats={stats} />
      </Layout>
    );
  }

  // Show staff control panel framework
  if (user?.role === 'staff') {
    return (
      <Layout>
        <StaffWelcome userName={user?.name} stats={stats} role={user?.role} />
      </Layout>
    );
  }

  // Default fallback
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Overview of campus resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="📅"
            color="border-blue-500"
          />
          <StatCard
            title="Pending Bookings"
            value={stats.pendingBookings}
            icon="⏳"
            color="border-yellow-500"
          />
          <StatCard
            title="Approved Bookings"
            value={stats.approvedBookings}
            icon="✅"
            color="border-green-500"
          />
          <StatCard
            title="Total Resources"
            value={stats.totalResources}
            icon="📚"
            color="border-purple-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/bookings"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-2xl mb-2">📅</div>
              <h3 className="font-semibold">View Bookings</h3>
              <p className="text-sm text-gray-600">Manage your bookings</p>
            </a>
            <a
              href="/resources"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold">Browse Resources</h3>
              <p className="text-sm text-gray-600">Explore available resources</p>
            </a>
            {user?.role === 'staff' && (
              <a
                href="/users"
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="text-2xl mb-2">👥</div>
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-gray-600">View and manage users</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
