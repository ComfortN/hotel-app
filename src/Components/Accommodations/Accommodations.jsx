import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/Accommodations.css';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import roomImage1 from '../../assets/Modern Bed Back Wall Design Luxury.png';
import roomImage2 from '../../assets/download.png';
import { FaStar, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchFavorites, addFavorite, removeFavorite, syncFavoritesToFirestore } from '../../redux/favoritesSlice';
import { fetchAccommodationsAsync } from '../../redux/accommodationSlice';
import { getAuth } from 'firebase/auth';
import { addToCart } from '../../redux/cartSlice';



export default function Accommodations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites, status: favoritesStatus, error: favoritesError } = useSelector((state) => state.favorites);
    const {accommodations, status: accommodationsStatus, error: accommodationsError } = useSelector((status) => status.accommodations);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const location = useLocation();
    // const room = location.state?.room;


    // Add room to cart
    const handleBookNow = (room) => {
        if (!room || !room.price) {
            console.error('Invalid room object:', room);
            return;
        }
        dispatch(addToCart({ ...room, pricePerNight: room.price }));
        navigate('/checkout');
    };
    


    //Fetch accommodations from Firestore
    useEffect(() => {
        dispatch(fetchAccommodationsAsync());
    }, [dispatch]);


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


    const handleShare = (room) => {
        if (navigator.share) {
            navigator.share({
                title: room.name,
                text: room.description,
                url: window.location.href
            })
            .then(() => console.log('Share successful'))
            .catch((error) => console.log('Share failed', error));
        } else {
            console.log('Web Share API not supported.');
        }
    };

    if (accommodationsStatus === 'loading') return <p>Loading...</p>;
    if (accommodationsStatus === 'failed') return <p>Error: {accommodationsError}</p>

    

    return (
        <div className="accommodations-page">
            <Banner title="ROOMS" />
            <section className="accommodations-list">
                {accommodations.map((room) => (
                    <div className="accommodation-item" key={room.id}>
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
                                    {/* Lux Stay Hotel offers a variety of suites and villas designed to provide you
                                    with the utmost comfort and luxury. Each suite is equipped with modern amenities
                                    and stunning views, making your stay a memorable experience. */}
                                    {room.description}
                                </p>
                                <div className="accommodation-info">
                                    <span>Price: R {room.price}</span>
                                </div>
                                <ul className="amenities-list">
                                    {room.amenities.map((amenity, i) => (
                                        <li key={i}>{amenity}</li>
                                    ))}
                                </ul>
                                <div className="accommodation-buttons">
                                    <Link to="/checkout">
                                        <button className="book-now-btn" onClick={() => handleBookNow(room)}>BOOK NOW</button>
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
                                    <button className="share-btn" onClick={() => handleShare(room)}>
                                        <FaShareAlt />
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
