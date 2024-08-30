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
          <Link to='/'><li>Home</li></Link>
          <Link to='/about'><li>About</li></Link>
          <Link to='/accommodations'><li>Accommodation</li></Link>
          <Link to='contact'><li>Contact</li></Link>
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
