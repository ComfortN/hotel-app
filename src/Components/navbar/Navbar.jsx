import React, {useState} from 'react'
import '../../styles/Navbar.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logoImg from '../../assets/LuxeStay Hotel logo (1).png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { logout } from '../../redux/userSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    
  return (
    <div>
      
      <nav className="main-navbar">

        <div className="logo">
          <img src={logoImg} alt="LuxeStay Hotel Logo" />
        </div>


        <ul className='nav-links'>
          <Link to='/'><li>Home</li></Link>
          <Link to='/about-us'><li>About</li></Link>
          <Link to='/accommodations'><li>Accommodation</li></Link>
          <Link to='/contact-us'><li>Contact</li></Link>
        </ul>

        <div className="nav-actions">
          <div className="profile-icon">
            <Link to={'/profile-page'}>
              <FaUserCircle />
            </Link>
          </div>
          {user ? (
                        <button className="login-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    ) : (
                        <Link to={'/signin'}>
                            <button className="login-button">Sign In</button>
                        </Link>
                    )}
        </div>
        <div className="menu-toggle" onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-links">
          <Link to="/" onClick={toggleSidebar}><li>Home</li></Link>
          <Link to="/about-us" onClick={toggleSidebar}><li>About</li></Link>
          <Link to="/accommodations" onClick={toggleSidebar}><li>Accommodation</li></Link>
          <Link to="/contact-us" onClick={toggleSidebar}><li>Contact</li></Link>
          <li>
            <Link to={'/profile-page'} onClick={toggleSidebar}>
              Profile
            </Link>
          </li>
          <li onClick={() => { handleLogout(); toggleSidebar(); }}>
              {user ? 'Log Out' : <Link to={'/signin'}>Sign In</Link>}
          </li>
        </ul>
      </div>
    </div>
  )
}
