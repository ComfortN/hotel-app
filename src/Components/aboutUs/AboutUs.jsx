import React from 'react';
import '../../styles/AboutUs.css';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import roomImage from '../../assets/download.png';

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <Banner title={"ABOUT US"} />

            <div className="about-us-content">
                <h2>ABOUT US</h2>
                <div className="about-text-container">
                    <h3>Lorem Ipsum is simply dummy text.</h3>
                    <div className='about-text'>
                        <p>
                            Welcome to LuxeStay, where luxury meets comfort
                            Our hotel is designed to provide you with an unparalleled experience,
                            offering the finest accommodations, exquisite dining options, and world-class amenities.
                            Whether you're here for business or leisure, we ensure that your stay will be unforgettable.
                        </p>
                        <p>
                            Our commitment to excellence is evident in every aspect of our service,
                            from our elegantly appointed rooms to our attentive and friendly staff.
                            Discover the true meaning of luxury at LuxeStay.
                        </p>
                    </div>
                    
                </div>
            </div>

        
        <div className="vision-section">
            <div className="vision-text">
            <h2>OUR VISION</h2>
            <p>
                Our vision is to create a luxurious environment where guests feel like royalty.
                We strive to provide exceptional service, top-notch facilities, and an unforgettable experience for each visitor.
            </p>
            <p>
                With our carefully curated decor, state-of-the-art amenities,
                and world-class dining, we aim to be the premier destination for both leisure and business travelers.
            </p>


            <h2>OUR MISSION</h2>
            <p>
                Our vision is to create a luxurious environment where guests feel like royalty.
                We strive to provide exceptional service, top-notch facilities, and an unforgettable experience for each visitor.
                With our carefully curated decor, state-of-the-art amenities,
                and world-class dining, we aim to be the premier destination for both leisure and business travelers.
            </p>
            </div>
            <div className="vision-image">
            <img
                src={roomImage} alt="Our Vision" className="vision-image-style"
            />
            </div>
        </div>

        <Footer />

    </div>
    )
}
