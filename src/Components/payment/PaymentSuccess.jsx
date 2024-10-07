import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../styles/PaymentSuccess.css';
import { FaCheckCircle } from "react-icons/fa";
import { saveAs } from 'file-saver';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase/firebase';

const PaymentSuccess = () => {
    const { receiptId } = useParams();
    const [receiptDetails, setReceiptDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReceiptDetails = async () => {
            try {
                if (!receiptId) {
                    console.error("No receiptId found.");
                    return;
                }

                const docRef = doc(database, 'receipts', receiptId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReceiptDetails(docSnap.data());
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchReceiptDetails();
    }, [receiptId]);

    const handleDownloadReceipt = () => {
        if (!receiptDetails) return;

        const { amount, cartItems, checkInDate, checkOutDate, paymentMethodId, firstName, phone, lastName, email, address, city, zipCode } = receiptDetails;
        const roomDetails = cartItems.map(item => `
            Room Name: ${item.name}
            Price Per Night: ${item.pricePerNight}
            Amenities: ${item.amenities.join(', ')}
        `).join('\n');

        const receiptContent = `
            Payment Successful

            Amount: ${amount}

            Payment Receipt:
            // Room Details: ${roomDetails}
            Check-in Date: ${new Date(checkInDate).toLocaleString()}
            Check-out Date: ${new Date(checkOutDate).toLocaleString()}
            Amount: ${amount}
            Payment Method: ${paymentMethodId}
            Customer Details:
            Name: ${firstName} ${lastName}
            Phone: ${phone}
        `;

        const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'receipt.txt');
    };

    if (!receiptDetails) {
        return <div>Loading...</div>;
    }

    const { amount, cartItems, checkInDate, checkOutDate, paymentMethodId, firstName, lastName, email, address, city, zipCode } = receiptDetails;
    console.log(receiptDetails)

    return (
        <div className="payment-success-page">
            <div className="payment-success-container">
                <div className="icon-container">
                    <FaCheckCircle className="success-icon" />
                </div>
                <h2>Payment Successful</h2>
                <p className="amount">Amount: R{amount}</p>
                <div className="payment-receipt">
                    <h3>Payment Receipt</h3>
                    <div className="receipt-details">
                        <div className="room-details">
                            <p>Room Details</p>
                            <p>Name: {firstName} {lastName}</p>
                            <p>Email: {email}</p>
                        </div>
                        <div className="date-amount">
                            <p>Dates:</p>
                            <p>{checkInDate}</p>
                            <p>{checkOutDate}</p>
                            <p>Amount: R{amount}</p>
                            
                        </div>
                        <div className="payment-method">
                            <p>Payment Method:</p>
                            <p>{paymentMethodId}</p>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <Link to={'/profile-page'}>
                        <button className="profile-button">My Profile</button>
                    </Link>
                    <button className="download-button" onClick={handleDownloadReceipt}>Download Receipt</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
