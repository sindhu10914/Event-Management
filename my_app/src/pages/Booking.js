import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(location.state?.event || null);
  const [seatsToBook, setSeatsToBook] = useState(location.state?.seatsToBook || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchingEvent, setFetchingEvent] = useState(!location.state?.event);

  const totalAmount = event ? event.price * seatsToBook : 0;

  useEffect(() => {
    // If event data not in state (e.g., browser back), fetch it
    if (!event) {
      fetchEventDetails();
    }
  }, [id]);

  const fetchEventDetails = async () => {
    setFetchingEvent(true);
    try {
      const response = await api.get(`/events/${id}/`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details');
    } finally {
      setFetchingEvent(false);
    }
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/bookings/', {
        event: parseInt(id),
        seats_booked: seatsToBook,
        payment_status: 'pending'
      });

      // Simulate payment
      await api.post(`/bookings/${response.data.id}/complete_payment/`);

      navigate('/user/dashboard', { 
        state: { message: 'Booking confirmed successfully!' } 
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingEvent) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-xl">Failed to load event details</p>
        <button 
          onClick={() => navigate('/events')}
          className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Confirm Booking</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Event:</span>
            <span>{event.event_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{event.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Time:</span>
            <span>{event.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Location:</span>
            <span>{event.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Seats:</span>
            <span>{seatsToBook}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price per seat:</span>
            <span>₹{event.price}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-xl">
            <span className="font-bold">Total Amount:</span>
            <span className="text-primary font-bold">₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Number of Seats:</label>
          <input
            type="number"
            min="1"
            max={event.available_seats}
            value={seatsToBook}
            onChange={(e) => setSeatsToBook(parseInt(e.target.value) || 1)}
            className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-gray-500 mt-2">Available seats: {event.available_seats}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-4">This is a simulated payment. Click confirm to complete your booking.</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmBooking}
          disabled={loading}
          className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-blue-600 font-semibold disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default Booking;
