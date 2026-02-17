import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login/', formData);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const role = response.data.user.role;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-white hidden md:block animate-fade-in-left">
            <h1 className="text-6xl font-extrabold mb-6">
              Welcome Back! 👋
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              Login to discover amazing events and create unforgettable memories
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🎫</span>
                </div>
                <span className="text-lg">Book tickets instantly</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">🎉</span>
                </div>
                <span className="text-lg">Discover trending events</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <span className="text-2xl">⭐</span>
                </div>
                <span className="text-lg">Rate and review events</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in-right">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                Login
              </h2>
              <p className="text-gray-600">Enter your credentials to continue</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 animate-shake">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  📧 Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  🔒 Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  '🚀 Login Now'
                )}
              </button>
            </form>

            {/* Quick Login Demo Accounts */}
            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <p className="text-center text-gray-600 font-semibold mb-4">
                🎯 Quick Login (Demo Accounts)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => quickLogin('user@smartevent.com', 'user123')}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  👤 User
                </button>
                <button
                  onClick={() => quickLogin('organizer@smartevent.com', 'organizer123')}
                  className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  🎪 Organizer
                </button>
                <button
                  onClick={() => quickLogin('admin@smartevent.com', 'admin123')}
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  👑 Admin
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 hover:text-purple-800 font-bold hover:underline">
                Create Account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
