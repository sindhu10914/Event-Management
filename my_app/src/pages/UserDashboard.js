import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';

const UserDashboard = () => {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/');
      setBookings(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.post(`/bookings/${bookingId}/cancel/`);
      setMessage('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      alert('Failed to cancel booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{booking.event_name}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Booking Reference: <span className="font-semibold">{booking.booking_reference}</span></p>
                    <p>Date: {booking.event_date}</p>
                    <p>Time: {booking.event_time}</p>
                    <p>Location: {booking.event_location}</p>
                    <p>Seats: {booking.seats_booked}</p>
                    <p>Total Amount: ₹{booking.total_amount}</p>
                    <p>Status: <span className={`font-semibold ${
                      booking.payment_status === 'completed' ? 'text-green-600' :
                      booking.payment_status === 'cancelled' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>{booking.payment_status.toUpperCase()}</span></p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {booking.qr_code && (
                    <img 
                      src={`http://localhost:8000${booking.qr_code}`} 
                      alt="QR Code" 
                      className="w-32 h-32"
                    />
                  )}
                  {booking.payment_status === 'completed' && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-12">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
