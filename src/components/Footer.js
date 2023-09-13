import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"; // Import social icons
import { Link } from "react-router-dom"; // Import Link component if needed

const Footer = () => {
  return (
    <div className="p-5 text-center">
      {/* Social Icons */}
      <div className="flex justify-center space-x-4">
        <Link to="https://facebook.com">
          <FaFacebook className="text-black text-xl hover:text-blue-500" />
        </Link>
        <Link to="https://twitter.com">
          <FaTwitter className="text-black text-xl hover:text-blue-500" />
        </Link>
        <Link to="https://instagram.com">
          <FaInstagram className="text-black text-xl hover:text-blue-500" />
        </Link>
        <Link to="https://youtube.com">
          <FaYoutube className="text-black text-xl hover:text-blue-500" />
        </Link>
      </div>

      <div className="mt-4">
        <Link to="/conditions-of-use" className="text-black hover:text-blue-500 mx-2">
          Conditions of Use
        </Link>
        <Link to="/privacy-policy" className="text-black hover:text-blue-500 mx-2">
          Privacy & Policy
        </Link>
        <Link to="/press-room" className="text-black hover:text-blue-500 mx-2">
          Press Room
        </Link>
      </div>


      {/* Copyright Text */}
      <p className="text-black">
        All rights reserved &copy; 2023 | teebabs52
      </p>
    </div>
  );
};

export default Footer;

