import React, {useState} from 'react';
import '../../styles/Checkout.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createBooking} from '../../redux/bookingSlice'
import StripeCheckout from 'react-stripe-checkout';
import StripePayment from './CheckoutForm';
import BookingForm from '../bookingForm/BookingForm';


export default function Checkout() {
  const { cartItems, bookingDetails } = useSelector((state) => state.cart);

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };


  // Function to calculate total amount dynamically
  const calculateTotalAmount = () => {
    const { checkInDate, checkOutDate, pricePerNight, rooms } = bookingDetails;
    
    if (!checkInDate || !checkOutDate || !pricePerNight || !rooms) {
        console.error('Missing booking details for total amount calculation');
        return 0;
    }
    
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    
    // Ensure pricePerNight and rooms are numbers
    const price = parseFloat(pricePerNight);
    const numRooms = parseInt(rooms, 10);
    
    if (isNaN(price) || isNaN(numRooms) || isNaN(numberOfNights)) {
        console.error('Invalid price or number of rooms:', price, numRooms, numberOfNights);
        return 0;
    }
    
    return (price * numberOfNights * numRooms).toFixed(2);
};


const totalAmount = calculateTotalAmount();


return (
<div className="checkout-page">
    <Navbar />
    <BookingForm />

    <div className="checkout-container">
        <div className="checkout-details">
            <h2>Customer Details</h2>
            <form>
            <div className="grid-container">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name='firstName' placeholder="Enter First Name" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name='lastName' placeholder="Enter Last Name" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Phone No</label>
                <input type="text" name='phone' placeholder="Enter Phone Number" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name='email' placeholder="Enter Email" onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" name='address' placeholder="Enter Address" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" name='city' placeholder="Enter City" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" name='zip' placeholder="Enter ZIP Code" onChange={handleInputChange} />
            </div>
            
            </form>
        </div>

        <div className="order-summary">
            <h2>Your Cart</h2>
            <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                  {item.name} - {item.price}
                  <div><strong>Adults:</strong> {bookingDetails.adults}</div>
                <div><strong>Children:</strong> {bookingDetails.children}</div>
                <div><strong>Rooms:</strong> {bookingDetails.rooms}</div>
                <div><strong>Check-In:</strong> {new Date(bookingDetails.checkInDate).toLocaleDateString()}</div>
                <div><strong>Check-Out:</strong> {new Date(bookingDetails.checkOutDate).toLocaleDateString()}</div>
              </li>
          ))}
            
            </ul>
            <div className="total">
            <p>Total: R {totalAmount}</p>
            </div>
        </div>

        
    </div>

    <div className="payment-container">
        <h2>Payment Details</h2>
        <StripePayment bookingDetails={{ ...bookingDetails, ...customerDetails, cartItems, totalAmount }} />

        
        </div>


        <div className="policies-container">
        <h2>Booking Policies</h2>
        <ul>
          <li>
            <strong>Check-in:</strong> Guests can check-in from 3:00 PM to 10:00 PM. Early check-in is subject to availability and may incur additional charges.
          </li>
          <li>
            <strong>Check-out:</strong> Check-out time is 12:00 PM. Late check-out is subject to availability and may incur additional charges.
          </li>
          <li>
            <strong>Cancellation Policy:</strong> Free cancellation is available up to 48 hours before the check-in date. Cancellations made within 48 hours of the check-in date will be charged the first night's stay.
          </li>
          <li>
            <strong>No Show:</strong> In case of no show, 100% of the first night's stay will be charged.
          </li>
          <li>
            <strong>Children and Extra Beds:</strong> Children of all ages are welcome. Extra beds are available upon request and may incur additional charges.
          </li>
          <li>
            <strong>Pets:</strong> Pets are not allowed in the premises.
          </li>
          <li>
            <strong>Payment:</strong> Full payment is required at the time of booking. We accept all major credit and debit cards.
          </li>
          <li>
            <strong>Smoking:</strong> Smoking is strictly prohibited inside the rooms. A cleaning fee will be charged for any violations.
          </li>
          <li>
            <strong>COVID-19 Precautions:</strong> Guests are required to follow all local COVID-19 guidelines, including wearing masks in common areas and maintaining social distancing.
          </li>
        </ul>
      </div>

    <Footer />
</div>
)
}
