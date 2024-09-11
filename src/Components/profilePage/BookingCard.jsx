import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import '../../styles/BookingCard.css';
import { useDispatch } from 'react-redux';
import { updateBookingRating } from '../../redux/bookingSlice';
import { useNavigate } from 'react-router-dom';

export default function BookingCard({ booking }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (booking.rating) {
            setRating(booking.rating);
        }
    }, [booking]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        dispatch(updateBookingRating({ id: booking.id, rating: newRating }));
    };

    const handleMouseEnter = (rating) => {
        setHoverRating(rating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleReviewClick = () => {
        navigate(`/review/${booking.id}`);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`star ${i <= (hoverRating || rating) ? 'filled' : ''}`}
                    onClick={() => handleRatingChange(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                />
            );
        }
        return stars;
    };

    return (
        <div className="booking-card">
            <div className="booking-details">
                {booking.cartItems[0]?.image && (
                    <img src={booking.cartItems[0]?.image} alt="Accommodation" className="booking-image" />
                )}
                <h3>{booking.cartItems[0]?.name || 'N/A'}</h3>
                <p>Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p>Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p>Status: {booking.status}</p>
                <p>Price: R{booking.cartItems[0]?.price || '0'}</p>
                <div className="booking-rating">
                    <label htmlFor="rating">Rate your stay: </label>
                    <div className="stars-container">
                        {renderStars()}
                    </div>
                    <div className="rating-display">
                        {hoverRating || rating}
                    </div>
                </div>

                <button className="review-btn" onClick={handleReviewClick}>
                    Write a Review
                </button>
            </div>
        </div>
    );
}
