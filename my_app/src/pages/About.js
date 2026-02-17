import React from 'react';

const About = () => {
  const teamMembers = [
    { name: 'Dr. Rajesh Kumar', role: 'Faculty Coordinator', dept: 'CSE Department' },
    { name: 'Priya Sharma', role: 'Student President', dept: 'Event Committee' },
    { name: 'Arjun Patel', role: 'Technical Head', dept: 'IT Department' },
    { name: 'Sneha Reddy', role: 'Cultural Secretary', dept: 'Arts Department' },
  ];

  const achievements = [
    { year: '2025', title: 'Best College Event Management', award: 'State Level Award' },
    { year: '2024', title: 'Most Innovative Tech Fest', award: 'University Recognition' },
    { year: '2023', title: 'Outstanding Cultural Programs', award: 'Regional Award' },
    { year: '2022', title: 'Excellence in Sports Events', award: 'District Championship' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600">
            Empowering students through memorable events and experiences
          </p>
        </div>

        {/* College History */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">🏛️</span>
            <h2 className="text-3xl font-bold text-gray-800">Our History</h2>
          </div>
          <div className="text-gray-600 space-y-4">
            <p className="text-lg leading-relaxed">
              Founded in 1985, our college has been a beacon of excellence in education and extracurricular activities. 
              With over 35 years of legacy, we have consistently organized world-class events that bring together students, 
              faculty, and industry professionals.
            </p>
            <p className="text-lg leading-relaxed">
              Our Event Management System was established in 2020 to streamline the process of organizing and participating 
              in various college events. From technical symposiums to cultural festivals, we ensure every event is a 
              memorable experience for all participants.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we proudly host over 50+ events annually, with participation from more than 5,000 students across 
              various departments. Our commitment to excellence has made us one of the leading institutions in event 
              management and student engagement.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🎯</span>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Provide platform for students to showcase their talents</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Foster creativity, innovation, and leadership skills</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Create memorable experiences through quality events</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Bridge the gap between academics and practical skills</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🔭</span>
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Be the leading college in event management excellence</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Create a vibrant campus culture through diverse events</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Empower every student to participate and excel</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Set new standards in student engagement and development</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Event Committee Members */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-8">
            <span className="text-4xl mr-4">👥</span>
            <h2 className="text-3xl font-bold text-gray-800">Event Committee</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.dept}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <span className="text-4xl mr-4">🏆</span>
            <h2 className="text-3xl font-bold text-gray-800">Our Achievements</h2>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full w-16 h-16 flex items-center justify-center mr-6">
                  {achievement.year}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-purple-600 font-semibold">{achievement.award}</p>
                </div>
                <span className="text-4xl">🎖️</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">35+</div>
            <div className="text-lg">Years of Excellence</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-lg">Events Annually</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">5000+</div>
            <div className="text-lg">Active Students</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-lg">Awards Won</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
