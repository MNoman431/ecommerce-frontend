import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Fancy Top Covers</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium quality covers to give your car a stylish and protective look.
              Trusted by thousands of customers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-red-500 transition">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition">
                <FiFacebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition">
                <FiTwitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-red-600 transition">
                <FiInstagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fancy Top Covers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
