import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReview, updateReview } from '../../redux/bookingSlice';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { database, auth } from '../../firebase/firebase';
import { FaStar } from 'react-icons/fa';
import '../../styles/ReviewForm.css';
import { getUserFromFirestore } from '../../firebase/firestoreUtils';


export default function ReviewForm() {
    const { bookingId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Initialize review state with empty values
    const [review, setReview] = useState({
        name: '',
        text: '',
        rating: 0
    });

    useEffect(() => {
        // Fetch user data from Firestore
        const fetchUser = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                try {
                    const userData = await getUserFromFirestore(currentUser.uid);
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
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



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  // Disable button during submission
    
        if (user) {
            try {
                if (review.id) {
                    // Update existing review
                    await dispatch(updateReview({ ...review, updatedAt: new Date() })).unwrap();
                    navigate('/profile-page');
                } else {
                    // Add new review
                    const reviewData = {
                        bookingId,
                        userId: user.id,
                        userName: user.firstName,
                        ...review,
                        createdAt: new Date()
                    };
                    await dispatch(addReview(reviewData)).unwrap();
                    navigate('/profile-page');
                }
            } catch (error) {
                console.error('Error submitting review:', error);
            } finally {
                setIsSubmitting(false);  // Re-enable button after submission
            }
        } else {
            console.error('User data is not available');
            setIsSubmitting(false);
        }
    };

    console.log(review)

    return (
        <div className="review-form">
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
                <button type="submit" disabled={!user || isSubmitting}>Submit Review</button>
            </form>
        </div>
    );
}
