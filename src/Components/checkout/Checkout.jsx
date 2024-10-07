import React, {useState, useEffect} from 'react';
import '../../styles/Checkout.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createBooking} from '../../redux/bookingSlice'
import StripeCheckout from 'react-stripe-checkout';
import StripePayment from './CheckoutForm';
import BookingForm from '../bookingForm/BookingForm';
import Loader from '../loader/Loader';


export default function Checkout() {
  const { cartItems, bookingDetails } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

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
  const location = useLocation();


  useEffect(() => {
    if (!user) {
      navigate('/signin',{ state: { from: location } });
    }
  }, [user, navigate]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };


  useEffect(() => {
    setLoading(true);
    const calculatedTotal = calculateTotalAmount();
    setTotalAmount(calculatedTotal);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    console.log('Calculated Total:', calculatedTotal);
  }, [bookingDetails]);


  // Function to calculate total amount dynamically
  const calculateTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      console.error('No items in cart');
      return 0;
    }

    const { checkInDate, checkOutDate, rooms } = bookingDetails;

    if (!checkInDate || !checkOutDate || !rooms) {
      console.error('Missing booking details for total amount calculation');
      return 0;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      console.error('Invalid date format for check-in or check-out date');
      return 0;
    }

    const numberOfNights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const numRooms = parseInt(rooms, 10);
    console.log(checkIn, checkIn)

    if (isNaN(numRooms) || numberOfNights <= 0) {
      console.error('Invalid number of rooms or number of nights:', numRooms, numberOfNights);
      return 0;
    }

    console.log('nn', numberOfNights)

    const totalPrice = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      if (isNaN(price)) {
        console.error('Invalid price for item:', item);
        console.log('pp: ',price)
        return total;
      }
      return total + price;
    }, 0);

    console.log('Calculation details:', { totalPrice, numberOfNights, numRooms });
    return (totalPrice * numberOfNights * numRooms).toFixed(2);
  };


// const totalAmount = calculateTotalAmount();


// Check if user is null and handle it appropriately
  if (!user) {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-container">
          <h2>Please sign in to proceed with the checkout</h2>
        </div>
        <Footer />
      </div>
    );
  }


const bookingDetailsWithUserId = {
  ...bookingDetails,
  ...customerDetails,
  cartItems,
  totalAmount,
  userId: user.uid
};



if (loading) {
  return <Loader />;
}


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
            {bookingDetails.checkInDate && bookingDetails.checkOutDate ? (
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
          ) : (
            <p>Please complete your booking details to see the order summary.</p>
          )}
            <div className="total">
            <p>Total: R {totalAmount}</p>
            </div>
        </div>

        
    </div>

    <div className="payment-container">
        <h2>Payment Details</h2>
        <StripePayment bookingDetails={bookingDetailsWithUserId} />

        
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
