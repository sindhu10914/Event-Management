import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '../utils/api';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalEvents: 0, totalUsers: 0, totalBookings: 0 });

  useEffect(() => {
    fetchEvents();
    animateStats();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const [featured, upcoming] = await Promise.all([
        publicApi.get('/events/featured/'),
        publicApi.get('/events/upcoming/')
      ]);
      setFeaturedEvents(featured.data);
      setUpcomingEvents(upcoming.data);
      
      // Simulate stats
      setStats({
        totalEvents: featured.data.length + upcoming.data.length,
        totalUsers: 1250,
        totalBookings: 3840
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const animateStats = () => {
    // Stats animation will be handled by CSS
  };

  const getEventImage = (eventName) => {
    const imageMap = {
      'Tech Conference': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
      'Music Festival': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop',
      'Startup': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop',
      'Marathon': 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400&h=200&fit=crop',
      'Comedy': 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=200&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=200&fit=crop',
      'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=200&fit=crop',
      'Gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
      'Book': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop',
      'Photography': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=200&fit=crop',
      'Dance': 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=200&fit=crop'
    };
    
    for (let key in imageMap) {
      if (eventName.includes(key)) return imageMap[key];
    }
    return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop';
  };

  const EventCard = ({ event, index }) => (
    <Link to={`/events/${event.id}`} className="block group">
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative overflow-hidden">
          <img
            src={event.image || getEventImage(event.event_name)}
            alt={event.event_name}
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            ₹{event.price}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white text-sm font-semibold">
              {event.available_seats} seats left
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">
            {event.event_name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">{event.date}</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            Book Now →
          </button>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-24 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-extrabold mb-6 animate-fade-in-down">
            Welcome to <span className="text-yellow-300">SmartEvent</span>
          </h1>
          <p className="text-2xl mb-8 animate-fade-in-up opacity-90">
            🎉 Discover Amazing Events • Book Instantly • Create Memories
          </p>
          <div className="flex justify-center gap-4 animate-fade-in">
            <Link
              to="/events"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              🎫 Browse Events
            </Link>
            <Link
              to="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-110"
            >
              ✨ Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
              {stats.totalEvents}+
            </div>
            <div className="text-gray-600 font-semibold">🎪 Total Events</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mb-2">
              {stats.totalUsers}+
            </div>
            <div className="text-gray-600 font-semibold">👥 Happy Users</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
              {stats.totalBookings}+
            </div>
            <div className="text-gray-600 font-semibold">🎟️ Bookings Made</div>
          </div>
        </div>
      </div>

      {/* Featured Events */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            🌟 Featured Events
          </h2>
          <p className="text-gray-600 text-lg">Handpicked events just for you</p>
        </div>
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading amazing events...</p>
          </div>
        ) : featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-gray-600 text-lg">No featured events available right now</p>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 mb-4">
              📅 Upcoming Events
            </h2>
            <p className="text-gray-700 text-lg">Don't miss out on these exciting events</p>
          </div>
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-600"></div>
              <p className="text-gray-700 mt-4 text-lg">Loading events...</p>
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📆</div>
              <p className="text-gray-600 text-lg">No upcoming events scheduled</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Create Your Event?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of organizers and reach millions of attendees</p>
            <Link
              to="/register"
              className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              🚀 Start Organizing Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
