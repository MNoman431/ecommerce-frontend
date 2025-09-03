import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-blue-400 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
