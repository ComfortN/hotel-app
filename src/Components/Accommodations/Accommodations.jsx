import React from 'react'
import '../../styles/Accommodations.css'
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import roomImage1 from '../../assets/Modern Bed Back Wall Design Luxury.png'
import roomImage2 from '../../assets/download.png';
import { FaStar } from 'react-icons/fa';

export default function Accommodations() {
    return (
    <div className="accommodations-page">
      
        <Banner title="ROOMS" />

        <section className="accommodations-list">
            <div className="accommodation-item">
            
                <div className="accommodation-details">
                    <div className='details-text'>
                        <div className='review'>
                            <div className="stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <span>Rating: 5.0</span>
                        </div>
                    
                        <h3>DISCOVER OUR LUXURY SUITES AND VILLAS</h3>
                        
                        <p>
                            Lux Stay Hotel offers a variety of suites and villas designed to provide you
                            with the utmost comfort and luxury. Each suite is equipped with modern amenities
                            and stunning views, making your stay a memorable experience.
                        </p>
                        
                        <div className="accommodation-info">
                            <span>Price: R1500 / night</span>
                            
                        </div>
                        <ul className="amenities-list">
                            <li>Soap & pillow menu</li>
                            <li>Luxury toiletries</li>
                            <li>Evening Turndown</li>
                            <li>Private balcony</li>
                        </ul>
                        <div className="accommodation-buttons">
                            <button className="book-now-btn">BOOK NOW</button>
                            <button className="learn-more-btn">LEARN MORE</button>
                        </div>

                    </div>
                    
                </div>
                <img src={roomImage1} alt="Luxury Suite" className="accommodation-image" />
            </div>

            <div className="accommodation-item">
                <img src={roomImage2} alt="Luxury Suite" className="accommodation-image" />
                <div className="accommodation-details">
                    <div className='details-text'>
                    <div className='review'>
                            <div className="stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <span>Rating: 5.0</span>
                        </div>
                    <h3>DISCOVER OUR LUXURY SUITES AND VILLAS</h3>
                        
                        <p>
                            Lux Stay Hotel offers a variety of suites and villas designed to provide you
                            with the utmost comfort and luxury. Each suite is equipped with modern amenities
                            and stunning views, making your stay a memorable experience.
                        </p>
                        <div className="accommodation-info">
                            <span>Price: R1800 / night</span>
                            
                        </div>

                        <ul className="amenities-list">
                            <li>Soap & pillow menu</li>
                            <li>Luxury toiletries</li>
                            <li>Evening Turndown</li>
                            <li>Private balcony</li>
                        </ul>
                        
                        <div className="accommodation-buttons">
                            <button className="book-now-btn">BOOK NOW</button>
                            <button className="learn-more-btn">LEARN MORE</button>
                        </div>
                    </div>
                    
                </div>
                </div>


                <div className="accommodation-item">
            
                <div className="accommodation-details">
                    <div className='details-text'>
                        <div className='review'>
                            <div className="stars">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <span>Rating: 5.0</span>
                        </div>
                        <h3>DISCOVER OUR LUXURY SUITES AND VILLAS</h3>
                        
                        <p>
                            Lux Stay Hotel offers a variety of suites and villas designed to provide you
                            with the utmost comfort and luxury. Each suite is equipped with modern amenities
                            and stunning views, making your stay a memorable experience.
                        </p>
                        
                        <div className="accommodation-info">
                            <span>Price: R1500 / night</span>
                            
                        </div>
                        <ul className="amenities-list">
                            <li>Soap & pillow menu</li>
                            <li>Luxury toiletries</li>
                            <li>Evening Turndown</li>
                            <li>Private balcony</li>
                        </ul>
                        <div className="accommodation-buttons">
                            <button className="book-now-btn">BOOK NOW</button>
                            <button className="learn-more-btn">LEARN MORE</button>
                        </div>

                    </div>
                    
                </div>
                <img src={roomImage1} alt="Luxury Suite" className="accommodation-image" />
            </div>
            </section>

            
            <Footer />
        </div>
    )
}
