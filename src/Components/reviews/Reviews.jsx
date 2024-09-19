import React, {useState, useEffect} from 'react'
import '../../styles/Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/bookingSlice';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.booking.reviews || []);

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);


    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    console.log('reviews:',reviews)
    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };


    if (reviews.length === 0) {
        return <div>Loading reviews...</div>;
    }

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
                    {[...Array(rating || 0)].map((_, index) => (
                        <FaStar key={index} />
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
