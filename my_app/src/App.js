import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import { isAuthenticated, getUserRole } from './utils/auth';

const PrivateRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  const userRole = getUserRole();
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/booking/:id" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <Booking />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/user/dashboard" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <UserDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/organizer/dashboard" 
              element={
                <PrivateRoute allowedRoles={['organizer', 'admin']}>
                  <OrganizerDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
