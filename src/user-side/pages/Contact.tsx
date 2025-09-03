import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan aap form submission logic add kar sakte hain
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Get in Touch With Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions about our car covers? We're here to help! Reach out to our team for expert advice and support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-8">
              We're always ready to assist you with any questions about our premium car covers and accessories.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-full">
                <FiPhone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone Number</h3>
                <p className="text-gray-600">+92 300 1234567</p>
                <p className="text-gray-600">+92 321 9876543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-full">
                <FiMail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Address</h3>
                <p className="text-gray-600">info@fancytopcovers.com</p>
                <p className="text-gray-600">support@fancytopcovers.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-full">
                <FiMapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Office Address</h3>
                <p className="text-gray-600">
                  Main Boulevard, Gulberg III<br />
                  Lahore, Punjab 54000<br />
                  Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 rounded-full">
                <FiClock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-gray-100 hover:bg-red-50 rounded-full transition-colors duration-200">
                <span className="w-5 h-5">📘</span>
              </a>
              <a href="#" className="p-3 bg-gray-100 hover:bg-red-50 rounded-full transition-colors duration-200">
                <span className="w-5 h-5">📸</span>
              </a>
              <a href="#" className="p-3 bg-gray-100 hover:bg-red-50 rounded-full transition-colors duration-200">
                <span className="w-5 h-5">🐦</span>
              </a>
              <a href="#" className="p-3 bg-gray-100 hover:bg-red-50 rounded-full transition-colors duration-200">
                <span className="w-5 h-5">📽️</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="What's this about?"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FiSend className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us Here</h2>
        <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <FiMapPin className="w-12 h-12 mx-auto mb-4 text-red-600" />
            <p className="text-lg font-semibold">Interactive Map</p>
            <p className="text-sm">Map integration would be here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;