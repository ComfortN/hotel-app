import React from 'react';
import '../../styles/ContactUs.css';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';

export default function ContactUs() {
    return (
        <div className="contact-us-page">
        <Banner title={"CONTACT US"} />

        <div className="contact-section">
            <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=your-google-map-url"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Map Location"
                    ></iframe>
                </div>

            <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa.
                </p>
                <div className="contact-details">
                    <p><strong>Address:</strong> Your Address Here</p>
                    <p><strong>Phone No:</strong> +123456789</p>
                    <p><strong>Email:</strong> email@example.com</p>
                </div>
            </div>

                
            </div>

            <div className="message-form-section">
                <h2>Contact Us With </h2>
                <h1>Write a Message</h1>
                <form className="contact-form">
                <div className="form-row">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="form-row">
                    <input type="text" placeholder="Phone No" required />
                    <input type="text" placeholder="Subject" required />
                </div>
                <div className="form-row-message">
                    <textarea placeholder="Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="send-message-button">Send Message</button>
                </form>
        </div>

        <Footer />
    </div>
    )
}
