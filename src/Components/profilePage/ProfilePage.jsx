import React, { useState, useEffect } from 'react';
import '../../styles/ProfilePage.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';
import { auth, database } from '../../firebase/firebase';
import { getUserFromFirestore, updateUserInFirestore } from '../../firebase/firestoreUtils';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings } from '../../redux/bookingSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookingCard from './BookingCard';


const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export default function ProfilePage() {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.booking.bookings || {});
    const { user } = useSelector((state) => state.user);


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
            try {
                const currentUser = auth.currentUser;
                console.log(currentUser)
                if (currentUser) {
                    const userData = await getUserFromFirestore(currentUser.uid);
                    if (userData) {
                        dispatch(fetchBookings(currentUser.uid));
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

    const handleSaveClick = async () => {
        setIsEditing(false);
        try {
            // Update Firestore with the new user data
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateUserInFirestore(currentUser.uid, userData);
                
            }
        } catch (error) {
            console.error("Error updating user data: ", error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <div className='profile-page'>
            <Navbar />
            <div className="profile-page-container">
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
                                <li key={index}>Favorite {favorite}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="profile-section">
                        <h2>My Reviews</h2>
                        <ul>
                            <li>Review 1 - "Great service!"</li>
                            <li>Review 2 - "Amazing experience!"</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
