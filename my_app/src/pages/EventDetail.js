import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated } from '../utils/auth';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [newRating, setNewRating] = useState({ rating: 5, review: '' });
  const [averageRating, setAverageRating] = useState(0);

  const getEventImage = (eventName) => {
    const imageMap = {
      'Tech Conference': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      'Music Festival': 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
      'Startup': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
      'Marathon': 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=600&h=400&fit=crop',
      'Comedy': 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop',
      'Art': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
      'Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
      'Gaming': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
      'Book': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      'Photography': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
      'Dance': 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop'
    };
    
    for (let key in imageMap) {
      if (eventName && eventName.includes(key)) return imageMap[key];
    }
    return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop';
  };

  useEffect(() => {
    fetchEventDetails();
    fetchRatings();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get(`/events/${id}/`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await api.get(`/ratings/?event=${id}`);
      const ratingsData = response.data.results || response.data;
      setRatings(ratingsData);
      
      // Calculate average rating
      if (ratingsData.length > 0) {
        const avg = ratingsData.reduce((sum, r) => sum + r.rating, 0) / ratingsData.length;
        setAverageRating(avg.toFixed(1));
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/ratings/', {
        event: id,
        rating: newRating.rating,
        review: newRating.review
      });
      
      setShowRatingForm(false);
      setNewRating({ rating: 5, review: '' });
      fetchRatings();
      alert('Rating submitted successfully! ⭐');
    } catch (error) {
      if (error.response?.status === 400) {
        alert('You have already rated this event');
      } else {
        alert('Failed to submit rating');
      }
      console.error('Error submitting rating:', error);
    }
  };

  const handleBooking = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate(`/booking/${id}`, { state: { event, seatsToBook } });
  };

  if (!event) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={event.image || getEventImage(event.event_name)}
            alt={event.event_name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{event.event_name}</h1>
          
          {/* Average Rating Display */}
          {averageRating > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-3xl text-yellow-500 mr-2">
                {'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}
              </span>
              <span className="text-2xl font-bold text-gray-700">{averageRating}</span>
              <span className="text-gray-500 ml-2">({ratings.length} reviews)</span>
            </div>
          )}
          
          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <span className="font-semibold w-32">Date:</span>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Time:</span>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Location:</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Price:</span>
              <span className="text-2xl text-primary font-bold">₹{event.price}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Available Seats:</span>
              <span className="text-lg">{event.available_seats}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">Organizer:</span>
              <span>{event.organizer_name}</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Number of Seats:</label>
            <input
              type="number"
              min="1"
              max={event.available_seats}
              value={seatsToBook}
              onChange={(e) => setSeatsToBook(parseInt(e.target.value))}
              className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            onClick={handleBooking}
            disabled={event.available_seats === 0}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 font-semibold disabled:bg-gray-400"
          >
            {event.available_seats === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">⭐ Reviews & Ratings</h2>
          {isAuthenticated() && (
            <button
              onClick={() => setShowRatingForm(!showRatingForm)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-shadow"
            >
              {showRatingForm ? 'Cancel' : '✍️ Write Review'}
            </button>
          )}
        </div>

        {/* Rating Form */}
        {showRatingForm && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 mb-6 shadow-lg">
            <form onSubmit={handleSubmitRating}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Your Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating({ ...newRating, rating: star })}
                      className="text-4xl focus:outline-none"
                    >
                      {star <= newRating.rating ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className="ml-4 text-xl font-bold text-gray-700">{newRating.rating}/5</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Your Review</label>
                <textarea
                  value={newRating.review}
                  onChange={(e) => setNewRating({ ...newRating, review: e.target.value })}
                  placeholder="Share your experience..."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {/* Ratings List */}
        {ratings.length > 0 ? (
          <div className="space-y-4">
            {ratings.map(rating => (
              <div key={rating.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                      {rating.user_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <span className="font-bold text-lg text-gray-800">{rating.user_name || 'Anonymous'}</span>
                      <div className="text-yellow-500 text-xl">
                        {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(rating.created_at).toLocaleDateString()}
                  </span>
                </div>
                {rating.review && (
                  <p className="text-gray-700 leading-relaxed">{rating.review}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-xl text-gray-500">No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
