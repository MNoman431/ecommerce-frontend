import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Fancy Top Covers</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium quality covers to give your car a stylish and protective look.
              Trusted by thousands of customers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/user/aboutUs"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <Link
                  to="/user/contact"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 rounded-full bg-gray-700 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiFacebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-gray-700 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiTwitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-gray-700 hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FiInstagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fancy Top Covers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
