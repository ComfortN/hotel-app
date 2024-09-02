import React from 'react';
import '../../styles/PaymentSuccess.css';
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
    return (
        <div className="payment-success-page">
            <div className="payment-success-container">
                <FaCheckCircle className="success-icon" />

                <h2>Payment Successful</h2>
                <p className="amount">ZAR 000.00</p>

                <div className="payment-receipt">
                    <h3>Payment Receipt</h3>
                    <div className="receipt-details">
                        <div className="room-details">
                            <p>Room Details</p>
                            <p>Room Details</p>
                        </div>
                        <div className="date-amount">
                            <p>Mon, Sep 10, 2024 - Tue, Sep 17, 2024</p>
                            <p>ZAR 000.00</p>
                        </div>
                        <div className="payment-method">
                            <p>Payment Method</p>
                            <p>Credit Card</p>
                        </div>
                    </div>
                </div>

                <div className="actions">
                    <button className="profile-button">My Profile</button>
                    <button className="download-button">Download Receipt</button>
                </div>
            </div>
        </div>
    )
}
