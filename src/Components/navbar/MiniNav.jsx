import React from 'react';
import '../../styles/MiniNav.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div>
        {/* Mini Navbar */}
      <div className="mini-navbar">
        <div className="mini-navbar-left">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
        <div className="mini-navbar-right">
          <span><FaPhoneAlt /> +123 456 7890</span>
          <span><FaEnvelope /> info@example.com</span>
          <Link to={'/accommodations'}>
              <button className="book-now-btn">Book Now</button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}
