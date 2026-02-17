import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send contact form data
    console.log('Contact Form Data:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-fade-in">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  👤 Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

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
                  📝 Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="What is this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  💬 Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Tell us more..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Address</h3>
                    <p className="text-gray-600">
                      College Campus<br />
                      Main Building, Ground Floor<br />
                      Chennai, Tamil Nadu 600001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Phone</h3>
                    <p className="text-gray-600">
                      +91 98765 43210<br />
                      +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Email</h3>
                    <p className="text-gray-600">
                      events@college.edu<br />
                      support@college.edu
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Working Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors">
                  <span className="text-2xl">📘</span>
                </a>
                <a href="#" className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition-colors">
                  <span className="text-2xl">📷</span>
                </a>
                <a href="#" className="bg-blue-400 text-white p-4 rounded-full hover:bg-blue-500 transition-colors">
                  <span className="text-2xl">🐦</span>
                </a>
                <a href="#" className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors">
                  <span className="text-2xl">📺</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
