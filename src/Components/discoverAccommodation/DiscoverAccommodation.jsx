import React from 'react'
import '../../styles/DiscoverAccommodation.css';
import suiteImage from '../../assets/Modern Bed Back Wall Design Luxury.png';

export default function DiscoverAccommodation() {
    return (
        <section className="luxury-suites">
            <div className="luxury-suites-content">
                <div className="luxury-suites-image">
                    <img src={suiteImage} alt="Luxury Suite" />
                </div>

                <div className="luxury-suites-text">
                    <div className='theText'>
                        <h2>Discover Our Luxury <br /> Suites and Villas</h2>
                    <p>
                        LuxeStay offers a diverse range of luxury suites and villas designed to provide the utmost comfort and elegance.
                        Whether you're seeking a cozy room with modern amenities or a lavish villa with breathtaking views,
                        we have something to suit every taste.
                    </p>
                    <button className="view-accommodation-btn">View Accommodations</button>
                    </div>
                    
                    
                </div>
                
            </div>
        </section>
    )
}
