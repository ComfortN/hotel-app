import React from 'react'
import '../../styles/RoomDetails.css';
import roomImage from '../../assets/download.png';
import { FaStar } from 'react-icons/fa';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import { FaWifi, FaConciergeBell, FaUtensils, FaSwimmingPool } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function RoomDetails() {
    return (
        <div className="room-details-page">
        <Banner title="ROOM" pageTitle="Room Details" />

        <section className="room-info">
            <div className="room-info-container">
                <div className='info-image'>
                    <img src={roomImage} alt="Room" className="room-image" />
                </div>
                

                <div className="room-details-text">
                    <div className='details-text'>
                        <div className="review">
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
                        Our luxury suites are designed to provide the utmost comfort and elegance.
                        Each suite features modern amenities, stylish interiors, and stunning views to ensure a memorable stay.
                    </p>

                    <p>
                    <p>
                        Our commitment to excellence is evident in every aspect of our service,
                        from our elegantly appointed rooms to our attentive and friendly staff.
                        Discover the true meaning of luxury at LuxeStay.
                    </p>
                    </p>
                    
                    <div className="room-price">
                        <span>Price: R1500 / night</span>
                    </div>

                    <ul className="amenities-lists">
                        <li>Soap & pillow menu</li>
                        <li>Luxury toiletries</li>
                        <li>Evening Turndown</li>
                        <li>Private balcony</li>
                    </ul>

                    <div className="room-buttons">
                        <Link to={'/checkout'}>
                            <button className="book-now-btn">BOOK NOW</button>

                        </Link>
                        
                    </div>
                    </div>
                    
                </div>
            </div>
        </section>

        <section className="room-facilities">
            <h2>ROOM FACILITIES</h2>
            <div className="facilities-grid">
            <div className="featuress">
                        <div className="feature">
                            <FaWifi className="feature-icon" />
                            <p>Free Wi-Fi</p>
                        </div>
                        <div className="feature">
                            <FaConciergeBell className="feature-icon" />
                            <p>Luxury Service</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Fine Dining</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Air Conditioning</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Air Conditioning</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                    </div>
            </div>
        </section>

        <Footer />
        </div>
    )
}
