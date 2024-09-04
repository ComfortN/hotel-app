import React from 'react';
import '../../styles/LandingAbout.css'
import { Link } from 'react-router-dom';

export default function LandingAbout() {
    return (
    <section className="about-us">
        <div className='title-and-subtittle'>
            <h2>About Us</h2>

            <h4>Experience Luxury Like Never <br />Before at our exclusive hotel</h4>
        </div>
        <div className="about-us-content">
            
        <p>
            Welcome to LuxeStay, where luxury meets comfort
            Our hotel is designed to provide you with an unparalleled experience,
            offering the finest accommodations, exquisite dining options, and world-class amenities.
            Whether you're here for business or leisure, we ensure that your stay will be unforgettable.
        </p>
        {/* <p>
          Our commitment to excellence is evident in every aspect of our service,
          from our elegantly appointed rooms to our attentive and friendly staff.
          Discover the true meaning of luxury at LuxeStay.
        </p> */}
        <Link to={'/about-us'}>
          <button className="learn-more-btn">Learn More</button>
        </Link>
        
      </div>
    </section>
  )
}
