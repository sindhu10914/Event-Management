import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    min_price: '',
    max_price: '',
    start_date: '',
    end_date: ''
  });
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events', icon: '🎪', color: 'purple' },
    { id: 'tech', name: 'Tech', icon: '💻', color: 'blue' },
    { id: 'music', name: 'Music', icon: '🎵', color: 'pink' },
    { id: 'food', name: 'Food', icon: '🍔', color: 'orange' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'green' },
    { id: 'art', name: 'Art', icon: '🎨', color: 'red' }
  ];

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

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const response = await api.get(`/events/?${params.toString()}`);
      setEvents(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = (categoryId) => {
    setActiveFilter(categoryId);
    if (categoryId === 'all') {
      setFilters({ ...filters, search: '' });
    } else {
      setFilters({ ...filters, search: categoryId });
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      min_price: '',
      max_price: '',
      start_date: '',
      end_date: ''
    });
    setActiveFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-down">
            🎪 Discover Amazing Events
          </h1>
          <p className="text-xl opacity-90 animate-fade-in-up">
            Find the perfect event for you from thousands of options
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category.id
                  ? `bg-gradient-to-r from-${category.color}-600 to-${category.color}-500 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 animate-slide-in-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">🔍 Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="🔎 Search events..."
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                name="location"
                placeholder="📍 Location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="min_price"
                placeholder="💰 Min Price"
                value={filters.min_price}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative">
              <input
                type="number"
                name="max_price"
                placeholder="💵 Max Price"
                value={filters.max_price}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700 font-semibold">
            {loading ? 'Loading...' : `Found ${events.length} events`}
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              Grid View 📱
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading amazing events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                className="block group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image || getEventImage(event.event_name)}
                      alt={event.event_name}
                      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ₹{event.price}
                    </div>
                    <div className="absolute top-4 left-4">
                      {event.status === 'approved' && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white text-sm font-semibold">
                        🎟️ {event.available_seats} seats left
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {event.event_name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {event.description}
                    </p>
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
                      {event.average_rating > 0 && (
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-lg">⭐</span>
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            {event.average_rating} ({event.total_ratings} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      View Details →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
