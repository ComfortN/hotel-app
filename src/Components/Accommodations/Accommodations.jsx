import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/Accommodations.css';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import roomImage1 from '../../assets/Modern Bed Back Wall Design Luxury.png';
import roomImage2 from '../../assets/download.png';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { fetchFavorites, addFavorite, removeFavorite, syncFavoritesToFirestore } from '../../redux/favoritesSlice';
import { getAuth } from 'firebase/auth';

export default function Accommodations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites, status, error } = useSelector((state) => state.favorites);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    // Fetch favorites from Firestore or local storage on component mount
    useEffect(() => {
        dispatch(fetchFavorites(userId));
    }, [dispatch, userId]);

    // Sync local storage favorites to Firestore after login
    useEffect(() => {
        if (userId) {
            dispatch(syncFavoritesToFirestore(userId));
        }
    }, [dispatch, userId]);

    const toggleFavorite = (roomName) => {
        if (favorites.includes(roomName)) {
            dispatch(removeFavorite(roomName));
        } else {
            dispatch(addFavorite(roomName));
        }
    };

    const handleLearnMore = (room) => {
        navigate('/room-details', { state: { room } });
    };

    const rooms = [
        {
            name: 'Royal Suite',
            image: roomImage1,
            price: 'R1500 / night',
            rating: 5.0,
            amenities: ['Soap & pillow menu', 'Luxury toiletries', 'Evening Turndown', 'Private balcony'],
        },
        {
            name: 'Serenity Villa',
            image: roomImage2,
            price: 'R1800 / night',
            rating: 5.0,
            amenities: ['Soap & pillow menu', 'Luxury toiletries', 'Evening Turndown', 'Private balcony'],
        },
        {
            name: 'Prestige Suite',
            image: roomImage1,
            price: 'R1500 / night',
            rating: 5.0,
            amenities: ['Soap & pillow menu', 'Luxury toiletries', 'Evening Turndown', 'Private balcony'],
        },
    ];

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div className="accommodations-page">
            <Banner title="ROOMS" />
            <section className="accommodations-list">
                {rooms.map((room, index) => (
                    <div className="accommodation-item" key={index}>
                        <img src={room.image} alt={room.name} className="accommodation-image" />
                        <div className="accommodation-details">
                            <div className="details-text">
                                <div className="review">
                                    <div className="stars">
                                        {[...Array(5)].map((star, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <span>Rating: {room.rating}</span>
                                </div>
                                <h3>{room.name}</h3>
                                <p>
                                    Lux Stay Hotel offers a variety of suites and villas designed to provide you
                                    with the utmost comfort and luxury. Each suite is equipped with modern amenities
                                    and stunning views, making your stay a memorable experience.
                                </p>
                                <div className="accommodation-info">
                                    <span>Price: {room.price}</span>
                                </div>
                                <ul className="amenities-list">
                                    {room.amenities.map((amenity, i) => (
                                        <li key={i}>{amenity}</li>
                                    ))}
                                </ul>
                                <div className="accommodation-buttons">
                                    <Link to="/checkout">
                                        <button className="book-now-btn">BOOK NOW</button>
                                    </Link>
                                    <button
                                        className="learn-more-btn" onClick={() => handleLearnMore(room)}>
                                        LEARN MORE
                                    </button>
                                    <button
                                        className={`favorite-btn ${favorites.includes(room.name) ? 'favorited' : ''}`}
                                        onClick={() => toggleFavorite(room.name)}
                                    >
                                        {favorites.includes(room.name) ? <FaHeart /> : <FaRegHeart />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <Footer />
        </div>
    );
}
