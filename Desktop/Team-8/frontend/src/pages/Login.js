import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role) => {
    const quickLoginUsers = {
      student: { email: 'student@campus.edu', password: 'student123' },
      staff: { email: 'staff@campus.edu', password: 'staff123' },
      admin: { email: 'admin@campus.edu', password: 'admin123' }
    };
    setCredentials(quickLoginUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Campus Resource</h1>
          <p className="text-gray-600 mt-1">Management System</p>
          <p className="text-sm font-semibold text-red-600 mt-2">Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@campus.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 mb-3">Accounts:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickLogin('student')}
              className="bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
            >
              Student
            </button>
            <button
              onClick={() => handleQuickLogin('staff')}
              className="bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
            >
              Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
