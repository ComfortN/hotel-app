import React, { useState, useEffect } from 'react';
import '../../styles/ProfilePage.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [favorites, setFavorites] = useState([]);

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

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save userData to your backend or local storage here
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
                        <label>Name:</label>
                        {isEditing ? (
                            <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
                        ) : (
                            <p>{userData.name}</p>
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
                            <li>Booking 1 - Date: 01/01/2024</li>
                            <li>Booking 2 - Date: 02/02/2024</li>
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
