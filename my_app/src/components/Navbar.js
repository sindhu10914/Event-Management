import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            SmartEvent
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/events" className="text-gray-700 hover:text-primary">Events</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
            
            {isAuth ? (
              <>
                {role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary">
                    Admin Dashboard
                  </Link>
                )}
                {role === 'organizer' && (
                  <Link to="/organizer/dashboard" className="text-gray-700 hover:text-primary">
                    Organizer Dashboard
                  </Link>
                )}
                {role === 'user' && (
                  <Link to="/user/dashboard" className="text-gray-700 hover:text-primary">
                    My Bookings
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
