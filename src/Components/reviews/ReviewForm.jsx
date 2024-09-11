import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/bookingSlice';
import { addDoc, collection } from 'firebase/firestore';
import { database, auth } from '../../firebase/firebase';
import { FaStar } from 'react-icons/fa';
import '../../styles/ReviewForm.css';
import { getUserFromFirestore } from '../../firebase/firestoreUtils';

export default function ReviewForm() {
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (newRating) => {
        setReview({ ...review, rating: newRating });
    };

    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            const reviewData = {
                bookingId,
                userId: user.id,
                userName: user.firstName,
                ...review,
                createdAt: new Date()
            };

            try {
                await addDoc(collection(database, 'reviews'), reviewData);
                dispatch(addReview(reviewData));
            } catch (error) {
                console.error('Error submitting review:', error);
            }
        } else {
            console.error('User data is not available');
        }
    };

    return (
        <div className="review-form">
            <h2>Write a Review</h2>
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
                <button type="submit" disabled={!user}>Submit Review</button>
            </form>
        </div>
    );
}
