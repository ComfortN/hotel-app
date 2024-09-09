import React from 'react'
import '../../styles/RoomDetails.css';
import roomImage from '../../assets/download.png';
import { FaStar, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import Banner from '../baner/Banner';
import Footer from '../foooter/Footer';
import { FaWifi, FaConciergeBell, FaUtensils, FaSwimmingPool } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, fetchFavorites } from '../../redux/favoritesSlice';
import { getAuth } from 'firebase/auth';

export default function RoomDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const room = location.state?.room;
    const { favorites } = useSelector((state) => state.favorites);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    // Add room to cart
    const handleBookNow = () => {
        dispatch(addToCart({ ...room, pricePerNight: room.price }));
        navigate('/checkout');
    }


    // Toggle favorite
    const toggleFavorite = () => {
        if (favorites.includes(room.name)) {
            dispatch(removeFavorite(room.name));
        } else {
            dispatch(addFavorite(room.name));
        }
    };

    // Share room details
    const handleShare = () => {
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


    if (!room) {
        return <p>Room details not available.</p>;
    }

    return (
        <div className="room-details-page">
        <Banner title="ROOM" pageTitle="Room Details" />
        

        <section className="room-info">
            <div className="room-info-container">
                <div className='info-image'>
                    <img src={room.image} alt={room.name} className="room-image" />
                </div>
                

                <div className="room-details-text">
                    <div className='details-text'>
                        <div className="review">
                        <div className="stars">
                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                        </div>
                    <span>Rating: {room.rating}</span>
                    </div>
                    
                    {/* <h3>DISCOVER OUR LUXURY SUITES AND VILLAS</h3> */}
                    <h3>{room.name}</h3>
                    <p>
                        {/* Our luxury suites are designed to provide the utmost comfort and elegance.
                        Each suite features modern amenities, stylish interiors, and stunning views to ensure a memorable stay. */}
                        {room.description}
                    </p>

                    <p>
                    <p>
                        Our commitment to excellence is evident in every aspect of our service,
                        from our elegantly appointed rooms to our attentive and friendly staff.
                        Discover the true meaning of luxury at LuxeStay.
                    </p>
                    </p>
                    
                    <div className="room-price">
                        <span>Price: R {room.price}</span>
                    </div>

                    <ul className="amenities-lists">
                    {room.amenities.map((amenity, i) => (
                                    <li key={i}>{amenity}</li>
                                ))}
                    </ul>

                    <div className="room-buttons">
                    <button className="book-now-btn" onClick={handleBookNow}>
                        BOOK NOW
                    </button>

                    <button
                        className={`favorite-btn ${favorites.includes(room.name) ? 'favorited' : ''}`}
                        onClick={toggleFavorite}
                    >
                        {favorites.includes(room.name) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button className="share-btn" onClick={handleShare}>
                        <FaShareAlt />
                    </button>
                        
                    </div>
                    </div>
                    
                </div>
            </div>
        </section>

        <section className="room-facilities">
            <h2>ROOM FACILITIES</h2>
            <div className="facilities-grid">
            <div className="featuress">
                        <div className="feature">
                            <FaWifi className="feature-icon" />
                            <p>Free Wi-Fi</p>
                        </div>
                        <div className="feature">
                            <FaConciergeBell className="feature-icon" />
                            <p>Luxury Service</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Fine Dining</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Air Conditioning</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                        <div className="feature">
                            <FaUtensils className="feature-icon" />
                            <p>Air Conditioning</p>
                        </div>
                        <div className="feature">
                            <FaSwimmingPool className="feature-icon" />
                            <p>Swimming Pool</p>
                        </div>
                    </div>
            </div>
        </section>

        <Footer />
        </div>
    )
};
