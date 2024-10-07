import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReview, updateReview } from '../../redux/bookingSlice';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { database, auth } from '../../firebase/firebase';
import { FaStar } from 'react-icons/fa';
import '../../styles/ReviewForm.css';
import { getUserFromFirestore } from '../../firebase/firestoreUtils';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';


export default function ReviewForm() {
    const { bookingId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();

    // Initialize review state with empty values
    const [review, setReview] = useState({
        name: '',
        text: '',
        rating: 0
    });

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const currentUser = auth.currentUser;
            if (currentUser) {
                try {
                    const userData = await getUserFromFirestore(currentUser.uid);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setAlert({ show: true, type: 'error', message: 'Failed to fetch user data. Please try again.' });
                }
            }
            setIsLoading(false);
        };
    
        fetchUser();
    }, []);

    useEffect(() => {
        // Check if there's review data passed through state
        if (location.state && location.state.review) {
            setReview(location.state.review);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setReview({ ...review, rating: newRating });
    };


    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ show: false, type: '', message: '' });
            }, 3000);
    
            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsLoading(true);
    
        if (user) {
            try {
                if (review.id) {
                    await dispatch(updateReview({ ...review, updatedAt: new Date() })).unwrap();
                    setAlert({ show: true, type: 'success', message: 'Review updated successfully!' });
                } else {
                    const reviewData = {
                        bookingId,
                        userId: user.id,
                        userName: user.firstName,
                        ...review,
                        createdAt: new Date()
                    };
                    await dispatch(addReview(reviewData)).unwrap();
                    setAlert({ show: true, type: 'success', message: 'Review submitted successfully!' });
                }
                setTimeout(() => navigate('/profile-page'), 3000);
            } catch (error) {
                console.error('Error submitting review:', error);
                setAlert({ show: true, type: 'error', message: 'Failed to submit review. Please try again.' });
            } finally {
                setIsSubmitting(false);
                setIsLoading(false);
            }
        } else {
            console.error('User data is not available');
            setAlert({ show: true, type: 'error', message: 'User data is not available. Please try again.' });
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    console.log(review)

    return (
        <div className="review-form-container">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="review-form">
                    {alert.show && <Alert type={alert.type} message={alert.message} />}
                    <h2>{review.id ? 'Edit Review' : 'Write a Review'}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Review Name:
                            <input type="text" name="name" value={review.name} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Review Text:
                            <textarea name="text" value={review.text} onChange={handleInputChange} required />
                        </label>
                        <label>
                            Rating:
                            <div className="stars-container">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <FaStar
                                        key={rating}
                                        className={`star ${rating <= review.rating ? 'filled' : ''}`}
                                        onClick={() => handleRatingChange(rating)}
                                    />
                                ))}
                            </div>
                        </label>
                        <button type="submit" disabled={!user || isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
