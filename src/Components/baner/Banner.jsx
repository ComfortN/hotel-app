import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import '../../styles/Baner.css'
import backgroundImg from '../../assets/hotel-home.jpeg'
import logoImg from '../../assets/LuxeStay Hotel logo (1).png';
import Navbar from '../navbar/Navbar';
import MiniNav from '../navbar/MiniNav';
import CheckAvaillabilityForm from './CheckAvaillabilityForm';

export default function Banner() {
  return (
    <header className="banner" style={{backgroundImage: `url(${backgroundImg})`}}>

      <MiniNav />

      <Navbar />

      {/* Landing Section */}
      <div className="landing-section">
        <h2>The Beauty of Fancy Living</h2>
        <p>Experience luxury like never before at our exclusive hotel.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          
        </div>
      </div>


      <CheckAvaillabilityForm />
    </header>
  )
}
