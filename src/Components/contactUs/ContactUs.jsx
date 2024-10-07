import React, {useState} from 'react';
import '../../styles/ContactUs.css';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNo: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Here you would typically send the data to your backend
        // For this example, we'll just simulate an API call with a timeout
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            setAlert({ show: true, type: 'success', message: 'Message sent successfully!' });
            setFormData({
                fullName: '',
                email: '',
                phoneNo: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setAlert({ show: true, type: 'error', message: 'Failed to send message. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="contact-us-page">
        <Banner title={"CONTACT US"} />
        {alert.show && <Alert type={alert.type} message={alert.message} />}

        <div className="contact-section">
            <div className="contact-map">
                    {/* <iframe
                        src="https://www.google.com/maps/embed?pb=your-google-map-url"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Map Location"
                    ></iframe> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14313.588868560973!2d27.96004625!3d-26.2487687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sza!4v1725536379078!5m2!1sen!2sza" 
                    width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
                    ligula eget dolor. Aenean massa.
                </p>
                <div className="contact-details">
                    <p><strong>Address:</strong> 1234 Fancy Street, Lux City</p>
                    <p><strong>Phone No:</strong> +273456789</p>
                    <p><strong>Email:</strong>  info@luxestayhotel.com</p>
                </div>
            </div>

                
            </div>

            <div className="message-form-section">
                <h2>Contact Us With </h2>
                <h1>Write a Message</h1>
                {isLoading ? (
                    <Loader />
                ) : (
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
                )}
        </div>

        <Footer />
    </div>
    )
}
