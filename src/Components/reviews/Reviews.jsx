import React, {useState} from 'react'
import '../../styles/Reviews.css';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Reviews() {
    const reviews = [
        {
            name: 'Comfort',
            rating: 5,
            text: 'Amazing experience! The service was exceptional, and the rooms were luxurious. Highly recommend!'
        },
        {
            name: 'Nqobile',
            rating: 4,
            text: 'Beautiful hotel with top-notch amenities. The food was excellent. Will visit again!'
        },
        {
            name: 'Phumzile',
            rating: 5,
            text: 'Great location and very comfortable stay. The staff was very friendly and helpful.'
        }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const { name, rating, text } = reviews[currentReviewIndex];


    return (
        <section className="reviews-section">
            <h2><FaQuoteLeft />  Reviews</h2>
            <div className="review-card">
                <button onClick={prevReview} className="nav-arrow left-arrow">
                    <FaChevronLeft />
                </button>
                <div className="review-header">
                    <h3>{name}</h3>
                    <div className="review-rating">
                        {[...Array(rating)].map((star, i) => (
                            <FaStar key={i} className="star" />
                        ))}
                    </div>
                </div>
                <p className="review-text">"{text}"</p>
                <button onClick={nextReview} className="nav-arrow right-arrow">
                    <FaChevronRight />
                </button>
            </div>
                
        </section>
    )
}
