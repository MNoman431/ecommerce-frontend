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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-6 py-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
          Get in Touch With Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about our top covers? We're here to help! Reach out to our team for expert advice and support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Contact Information</h2>
          <div className="space-y-6">

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
                <FiPhone className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Phone Number</h3>
                <p className="text-gray-600 dark:text-gray-300">+92 300 1234567</p>
                <p className="text-gray-600 dark:text-gray-300">+92 321 9876543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
                <FiMail className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email Address</h3>
                <p className="text-gray-600 dark:text-gray-300">info@fancytopcovers.com</p>
                <p className="text-gray-600 dark:text-gray-300">support@fancytopcovers.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
                <FiMapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Office Address</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Main Boulevard, Gulberg III<br />
                  Lahore, Punjab 54000<br />
                  Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
                <FiClock className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Business Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
              />
            </div>

            <textarea
              name="message"
              rows={5}
              placeholder="Message *"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200 resize-none"
            />

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
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">Find Us Here</h2>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <FiMapPin className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
            <p className="text-lg font-semibold">Interactive Map</p>
            <p className="text-sm">Map integration would be here</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
