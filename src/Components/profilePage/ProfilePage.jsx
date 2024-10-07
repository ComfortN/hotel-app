import React, { useState, useEffect } from 'react';
import '../../styles/ProfilePage.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';
import { auth, database } from '../../firebase/firebase';
import { getUserFromFirestore, updateUserInFirestore } from '../../firebase/firestoreUtils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings, fetchReviews, deleteReview, updateReview } from '../../redux/bookingSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookingCard from './BookingCard';
import { FaEdit, FaTrashAlt, FaStar } from 'react-icons/fa';
import Loader from '../loader/Loader';
import Alert from '../alert/Alert';


const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export default function ProfilePage() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.booking.bookings || {});
    const reviews = useSelector((state) => state.booking.reviews || []);
    const { user } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });


    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    const [favorites, setFavorites] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin',{ state: { from: location } });
        }
    }, [user, navigate]);


    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const currentUser = auth.currentUser;
                console.log(currentUser)
                if (currentUser) {
                    const userData = await getUserFromFirestore(currentUser.uid);
                    if (userData) {
                        dispatch(fetchBookings(currentUser.uid));
                        dispatch(fetchReviews(currentUser.uid));
                        setUserData({
                            firstName: userData.firstName || "",
                            lastName: userData.lastName || "",
                            email: userData.email || "",
                            phone: userData.phone || "",
                            address: userData.address || "",
                        });
                        setFavorites(userData.favorites || []);
                    }
                } else {
                    console.log("No user is signed in.");
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [dispatch, auth.currentUser]);


    useEffect(() => {
        setFavorites(getFavoritesFromLocalStorage());
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };


    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ show: false, type: '', message: '' });
            }, 2000);
    
            return () => clearTimeout(timer);
        }
    }, [alert.show]);

    const handleSaveClick = async () => {
        setIsEditing(false);
        try {
            // Update Firestore with the new user data
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateUserInFirestore(currentUser.uid, userData);
                setAlert({ show: true, type: 'success', message: 'Profile updated successfully!' });
            }
        } catch (error) {
            console.error("Error updating user data: ", error);
            setAlert({ show: true, type: 'error', message: 'Failed to update profile. Please try again.' });
        }
    };

    console.log(reviews)

    const handleCancelClick = () => {
        setIsEditing(false);
    };


    const handleDeleteReview = (reviewId) => {
        dispatch(deleteReview(reviewId));
        setAlert({ show: true, type: 'info', message: 'Review deleted successfully.' });
    };

    const handleEditReview = (review) => {
        navigate(`/review/${review.id}`, { state: { review } });
        setAlert({ show: true, type: 'info', message: 'Editing review...' });
    };

    return (
        <div className='profile-page'>
            <Navbar />
            {isLoading ? (
            <Loader />
        ) : (
            <div className="profile-page-container">
                {alert.show && <Alert type={alert.type} message={alert.message} />}
                <div className="profile-header">
                    <h1>My Profile</h1>
                    {isEditing ? (
                        <div>
                            <button className="save-btn" onClick={handleSaveClick}>
                                Save
                            </button>
                            <button className="cancel-btn" onClick={handleCancelClick}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button className="edit-btn" onClick={handleEditClick}>
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="profile-details">
                    <h2>Profile Details</h2>
                    <div className="detail-item">
                        <label>First Name:</label>
                        {isEditing ? (
                            <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.firstName}</p>
                        )}
                    </div>
                    <div className="detail-item">
                        <label>Last Name:</label>
                        {isEditing ? (
                            <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.lastName}</p>
                        )}
                    </div>
                    <div className="detail-item">
                        <label>Email:</label>
                        {isEditing ? (
                            <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.email}</p>
                        )}
                    </div>
                    <div className="detail-item">
                        <label>Phone:</label>
                        {isEditing ? (
                            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.phone}</p>
                        )}
                    </div>
                    <div className="detail-item">
                        <label>Address:</label>
                        {isEditing ? (
                            <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.address}</p>
                        )}
                    </div>
                </div>

                <div className="profile-sections">
                    <div className="profile-section">
                        <h2>My Bookings</h2>
                        <ul>
                            {bookings.length > 0 ? bookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} /> 
                            )) : <p>No bookings found.</p>}
                        </ul>
                    </div>

                    <div className="profile-section">
                        <h2>My Favorites</h2>
                        <ul>
                            {favorites.map((favorite, index) => (
                                <li key={`${favorite}-${index}`}>Favorite {favorite}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="profile-section">
                        <h2>My Reviews</h2>
                        <ul>
                            {reviews.length > 0 ? reviews.map((review) => (
                                <li key={review.id} className="review-item">
                                    <div className="review-content">
                                        <div className="review-rating">
                                            {[...Array(review.rating || 0)].map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                        </div>
                                        <h3>{review.name || 'No Name'}</h3>
                                        <p>{review.text || 'No review text'}</p>
                                        <p>{new Date(review.createdAt).toLocaleDateString() || 'N/A'}</p>
                                    </div>
                                    <div className="review-actions">
                                        <button onClick={() => handleEditReview(review)}>
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDeleteReview(review.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </li>
                            )) : (
                                <p>No reviews found.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )}
            <Footer />
        </div>
    );
}
