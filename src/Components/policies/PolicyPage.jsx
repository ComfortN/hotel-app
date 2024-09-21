import React, { useState } from 'react';
import '../../styles/PolicyPage.css'; // Add your own styles here
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';

export default function PolicyPage() {
    // State to keep track of the active page (Privacy Policy or Terms of Service)
    const [activePage, setActivePage] = useState('privacy'); // Default is Privacy Policy

    // Event handlers for switching pages
    const showPrivacyPolicy = () => setActivePage('privacy');
    const showTermsOfService = () => setActivePage('terms');

    return (
        <div className="policy-container">
            <Banner />
            <div className="policy-nav">
                <button 
                onClick={showPrivacyPolicy} 
                className={activePage === 'privacy' ? 'active' : ''}
                >
                Privacy Policy
                </button>
                <button 
                onClick={showTermsOfService} 
                className={activePage === 'terms' ? 'active' : ''}
                >
                Terms of Service
                </button>
            </div>

            <div className="policy-content">
                {activePage === 'privacy' ? <PrivacyPolicy /> : <TermsOfService />}
            </div>
            <Footer />
        </div>
    );
    }

    // Privacy Policy Content
    function PrivacyPolicy() {
    return (
        <div>
        <h1>Privacy Policy</h1>
        <p>Last updated: [20/09/2024]</p>

        <p>LuxeStay Hotel (“we,” “our,” or “us”) is committed to protecting and respecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, book a room, or use our services.
            Please read this policy carefully. If you do not agree with our policies and practices, please do not use our services.</p>
        <h2>1. Information We Collect</h2>
        <p>[We collect various types of information from and about users of our services, including:]</p>
        <ul>
            <li>Personal Information: Name, email address, phone number, payment details, and home address provided during booking or account creation.</li>
            <li>Booking Information: Information related to reservations, such as room preferences, check-in/out dates, and booking history.</li>
            <li>Technical Data: IP address, browser type, operating system, and browsing behavior while using our website.</li>
            <li>Cookies: We use cookies and similar technologies to improve your browsing experience and personalize our services.</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>[We use the information we collect to:]</p>

        <ul>
            <li>Process bookings: Confirm reservations, manage check-ins and check-outs, and handle cancellations.</li>
            <li>Improve our services: Analyze user behavior to enhance our offerings and website functionality.</li>
            <li>Marketing: Send promotional emails or offers, only if you have opted in.</li>
            <li>Legal obligations: Comply with any legal or regulatory requirements</li>
        </ul>
        
        <h2>3. Data Sharing and Disclosure</h2>
        <p>[We may share your information with third parties under the following circumstances:]</p>
        <ul>
            <li>Service Providers: Third-party vendors who help us with reservations, payment processing, email delivery, or website analytics</li>
            <li>Legal Requirements: If required by law, or to protect the safety of LuxeStay Hotel, our guests, or the public.</li>
            <li>Business Transfers: In case of a merger, sale, or acquisition, your information may be transferred to new owners.</li>
        </ul>
        <p>We do not sell or rent your personal information to third parties for marketing purposes.</p>

        <h2>4. Data Security</h2>
        <p>[We take the security of your personal information seriously.
            We use reasonable technical, administrative, and physical safeguards to protect your data from unauthorized access, alteration, disclosure, or destruction.
            However, no system is completely secure, and we cannot guarantee absolute security.]</p>
        
        <h2>5. Your Rights</h2>
        <p>[You have the right to:]</p>
        <ul>
            <li>Access: Request a copy of the personal information we hold about you.</li>
            <li>Correction: Request correction of inaccurate or incomplete information.</li>
            <li>Deletion: Request deletion of your data, unless we are legally required to retain it.</li>
            <li>Opt-out: Withdraw your consent to receive marketing communications at any time.</li>
        </ul>
        
        <h2>6. Changes to This Privacy Policy</h2>
        <p>[We may update this Privacy Policy from time to time.
            Changes will be posted on this page with the updated "Last updated" date at the top.
            We encourage you to review this policy periodically.]</p>
        
        <h2>7. Contact Us</h2>
        <p>[If you have any questions or concerns about this Privacy Policy, please contact us at:]</p>
        <p>LuxeStay Hotel<br />
            1234 Fancy Street, Lux City <br/>
            Phone: +1 234 567 890<br />
            Email: info@luxestayhotel.com</p>
        </div>
    );
    }

    // Terms of Service Content
    function TermsOfService() {
    return (
        <div>
        <h1>Terms of Service</h1>
        <p>Last updated: [20/09/2024]</p>

        <p>Welcome to LuxeStay Hotel. By accessing or using our website, making a booking,
            or using our services, you agree to comply with and be bound by the following Terms of Service (“Terms”).
            Please read these Terms carefully before using our services. If you do not agree with these Terms, please do not use our website or services.</p>

        <h2>1. Acceptance of Terms</h2>
        <p>[By accessing our website, making a reservation, or using any of our services,
            you confirm that you accept these Terms of Service and agree to comply with them.
            If you do not agree, please refrain from using our services.]</p>
        
        <h2>2. Changes to Terms</h2>
        <p>[We reserve the right to modify or update these Terms at any time. Changes will be posted on this page with an updated "Last updated" date.
            It is your responsibility to review these Terms periodically.
            Your continued use of our services after changes are posted constitutes acceptance of those changes.]</p>
        
        <h2>3. User Responsibilities</h2>
        <ul>
            <li>Booking Process: You can book a room through our website,
                by phone, or in person. When booking, you must provide accurate personal information and payment details.</li>
            <li>Payment: Full or partial payment may be required at the time of booking.
                The amount and payment terms will be specified during the booking process.</li>
            <li>Cancellations: Cancellations are subject to our cancellation policy, which varies based on room type and time of booking.
                Please refer to the specific terms provided during your booking process.</li>
        </ul>
        
        <h2>4. Limitation of Liability</h2>
        <p>[By using our website or services, you agree to:]</p>
        <ul>
            <li>Provide accurate information: You must provide complete and accurate details during the booking process.</li>
            <li>Follow hotel rules: Comply with all hotel policies during your stay, including check-in/check-out times, no-smoking areas, and safety guidelines.</li>
            <li>Respectful conduct: Treat other guests and staff with respect. We reserve the right to terminate your stay if you engage in unlawful or disruptive behavior.</li>
        </ul>

        <h2>5. Limitation of Liability</h2>
        <ul>
            <li>Hotel Liability: While we take every precaution to ensure your safety and comfort, LuxeStay Hotel is not liable for any damages or losses incurred during your stay,
                including but not limited to personal injury, loss of property, or business disruptions.</li>
            <li>Website Use: We strive to keep our website and booking system up to date, but we cannot guarantee uninterrupted or error-free access.
                LuxeStay Hotel is not liable for any technical issues, website downtime, or data inaccuracies.</li>
        </ul>

        <h2>6. Privacy and Data Protection</h2>
        <p>[Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy.
            By using our services, you consent to the collection,
            use, and sharing of your information as described in our Privacy Policy.]</p>
        
        <h2>7. Termination of Use</h2>
        <p>[We reserve the right to terminate or suspend your access to our services at any time if you breach these Terms or engage in any unlawful or harmful activities.
            Termination does not affect any of our rights or liabilities accrued before termination.]</p>

        <h2>8. Governing Law</h2>
        <p>[These Terms are governed by and construed in accordance with the laws of Souuth Africa.
            Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts of South Africa.]</p>

        <h2>9. Contact Us</h2>
        <p>[If you have any questions or concerns about this Privacy Policy, please contact us at:]</p>
        <p>LuxeStay Hotel<br />
            1234 Fancy Street, Lux City <br/>
            Phone: +1 234 567 890<br />
            Email: info@luxestayhotel.com</p>
        </div>
    );
}
