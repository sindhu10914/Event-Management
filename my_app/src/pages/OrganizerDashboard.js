import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const OrganizerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    total_seats: '',
    image: null
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/dashboard/organizer/');
      setStats(response.data);
      setEvents(response.data.my_events);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (editingEvent) {
        await api.patch(`/events/${editingEvent.id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/events/', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      setShowForm(false);
      setEditingEvent(null);
      resetForm();
      fetchDashboardData();
    } catch (error) {
      alert('Failed to save event');
    }
  };

  const resetForm = () => {
    setFormData({
      event_name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      price: '',
      total_seats: '',
      image: null
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      event_name: event.event_name,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      total_seats: event.total_seats,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await api.delete(`/events/${eventId}/`);
      fetchDashboardData();
    } catch (error) {
      alert('Failed to delete event');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">Total Events</h3>
            <p className="text-3xl font-bold text-primary">{stats.total_events}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm">Approved Events</h3>
            <p className="text-3xl font-bold text-green-600">{stats.approved_events}</p>
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
      )}

      {/* Create Event Button */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingEvent(null);
          resetForm();
        }}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 mb-6"
      >
        {showForm ? 'Cancel' : 'Create New Event'}
      </button>

      {/* Event Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="event_name"
                placeholder="Event Name"
                value={formData.event_name}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="number"
                name="total_seats"
                placeholder="Total Seats"
                value={formData.total_seats}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-600"
            >
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">My Events</h2>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{event.event_name}</h3>
                  <p className="text-gray-600">{event.location} - {event.date}</p>
                  <p className="text-sm">
                    Status: <span className={`font-semibold ${
                      event.status === 'approved' ? 'text-green-600' :
                      event.status === 'rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>{event.status.toUpperCase()}</span>
                  </p>
                  <p className="text-sm">Available Seats: {event.available_seats}/{event.total_seats}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
