// import React, { useState } from 'react';
// import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';

// const Contact: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-6 py-12 max-w-7xl mx-auto">

//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
//           Get in Touch With Us
//         </h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//           Have questions about our top covers? We're here to help! Reach out to our team for expert advice and support.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//         {/* Contact Info */}
//         <div className="space-y-8">
//           <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Contact Information</h2>
//           <div className="space-y-6">

//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
//                 <FiPhone className="w-6 h-6 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Phone Number</h3>
//                 <p className="text-gray-600 dark:text-gray-300">+92 300 1234567</p>
//                 <p className="text-gray-600 dark:text-gray-300">+92 321 9876543</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
//                 <FiMail className="w-6 h-6 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email Address</h3>
//                 <p className="text-gray-600 dark:text-gray-300">info@fancytopcovers.com</p>
//                 <p className="text-gray-600 dark:text-gray-300">support@fancytopcovers.com</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
//                 <FiMapPin className="w-6 h-6 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Shop Address</h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   17A Mintgomtory Road<br />
//                   Fancy Motors, Lahore<br />
//                   Pakistan
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="p-3 bg-red-50 dark:bg-red-900 rounded-full">
//                 <FiClock className="w-6 h-6 text-red-600 dark:text-red-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Business Hours</h3>
//                 <p className="text-gray-600 dark:text-gray-300">Monday - Saturday: 9:00 AM - 6:00 PM</p>
//                 <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Contact Form */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Send us a Message</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name *"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email *"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
//               />
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject *"
//                 required
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
//               />
//             </div>

//             <textarea
//               name="message"
//               rows={5}
//               placeholder="Message *"
//               required
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200 resize-none"
//             />

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
//             >
//               <FiSend className="w-5 h-5" />
//               Send Message
//             </button>

//           </form>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">Find Our Shop</h2>
//         <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 overflow-hidden">
//           {/* Google Maps Embed with your exact location */}
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435518.6817852355!2d74.054197184766!3d31.483220874915156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1647260382710!5m2!1sen!2s"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             className="rounded-2xl"
//           ></iframe>
//         </div>
        
//         {/* Directions Button */}
//         <div className="text-center mt-6">
//           <a 
//             href="https://www.google.com/maps/dir//17A+Mintgomtory+Road+Fancy+Motors+Lahore" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
//           >
//             <FiMapPin className="mr-2" />
//             Get Directions
//           </a>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Contact;


// import type { RootState } from "@reduxjs/toolkit/query";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { sendContactMessage } from "../../redux/user/contactThunks/ContactThunk";
import { resetContactState } from "../../redux/user/contactSlice/ContactSlice";

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.contact
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData));
  };

  useEffect(() => {
    if (success) {
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      dispatch(resetContactState());
    }
  }, [success, dispatch]);

  return (
    <div className="p-8 max-w-lg mx-auto bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
      <p className="text-gray-600 mb-6 text-center">
        Have questions? We'd love to hear from you. Fill out the form below!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject (Optional)"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-medium text-center">{error}</p>}
    </div>
  );
};

export default Contact;
