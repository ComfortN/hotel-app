import React from 'react'
import '../../styles/Navbar.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import logoImg from '../../assets/LuxeStay Hotel logo (1).png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      
      <nav className="main-navbar">

        <div className="logo">
          <img src={logoImg} alt="LuxeStay Hotel Logo" />
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>About</li>
          <li>Accommodation</li>
          <li>Contact</li>
        </ul>

        <div className="nav-actions">
          <div className="profile-icon">
            <FaUserCircle />
          </div>
          <Link to={'/signin'}>
            <button className="login-button">Sign In</button>
          </Link>
        </div>
      </nav>
    </div>
  )
}
