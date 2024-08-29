import React from 'react';
import '../../styles/Footer.css'
import logoImg from '../../assets/LuxeStay Hotel logo (1).png';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer class="footer">
        <div class="footer-content">
            
            <div class="footer-links">
                <div class="footer-section">
                    
                    <p> <FaMapMarkerAlt />  1234 Fancy Street, Lux City</p>
                    <p> <FaEnvelope /> Email: info@luxestayhotel.com</p>
                    <p> <FaPhoneAlt /> Phone: +1 234 567 890</p>
                </div>

                <div class="footer-logo">
                    <img src={logoImg} alt="Luxe Stay Hotel Logo" />
                </div>

                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                    </div>
                </div>
            </div>
            <ul className="nav-link">
                <li>Home</li>
                <li>About</li>
                <li>Accommodation</li>
                <li>Contact</li>
            </ul>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Luxe Stay Hotel. All rights reserved.</p>
            <ul class="footer-terms">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
            </ul>
        </div>
    </footer>


    )
}
