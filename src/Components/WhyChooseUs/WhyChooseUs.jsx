import React from 'react';
import '../../styles/WhyChooseUs.css';
import { FaWifi, FaConciergeBell, FaUtensils, FaSwimmingPool } from 'react-icons/fa';
import chooseUsimg from '../../assets/Modern Luxury Living Room Chandeliers.png';

export default function WhyChooseUs() {
    return (
        <section className="why-choose-us">
            <div className="why-choose-us-content">
                <div className='feature-heading'>
                    <h2>Why Choose Us</h2>
                    <div className="features">
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
                            <p>Fine Dining</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                    </div>
                </div>
            
                
                <div className='why-choose-us-img'>
                    <img src={chooseUsimg} alt='why choose us image' />
                </div>
            </div>
        </section>
    )
}
