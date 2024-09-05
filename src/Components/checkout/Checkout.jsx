import React, {useState} from 'react';
import '../../styles/Checkout.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {createBooking} from '../../redux/bookingSlice'
import StripeCheckout from 'react-stripe-checkout';
import StripePayment from './CheckoutForm';


export default function Checkout() {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
    const [cardDetails, setCardDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
      });

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    totalAmount,
    cartItems,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

      // const handleInputChange = (e) => {
      //   const { name, value } = e.target;
      //   setCardDetails({ ...cardDetails, [name]: value });
      // };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    };

    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   if (name in cardDetails) {
    //     setCardDetails({ ...cardDetails, [name]: value });
    //   } else {
    //     setCustomerDetails({ ...customerDetails, [name]: value });
    //   }
    // };
  
    // const onToken = (token) => {
    //   const bookingDetails = {
    //     ...customerDetails,
    //     cartItems,
    //     totalAmount,
    //     paymentToken: token,
    //   };
    //   dispatch(createBooking(bookingDetails))
    //     .unwrap()
    //     .then(() => {
    //       navigate('/successful-payment');
    //     })
    //     .catch((error) => {
    //       console.error('Failed to create booking:', error);
    //     });
    // };


    const bookingDetails = {
      ...customerDetails,
      totalAmount,
      cartItems,
  };
return (
<div className="checkout-page">
    <Navbar />

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
        <StripePayment bookingDetails={bookingDetails} />
        {/* <div className='card-payment'>
            <div className="card-preview">
            <div className="card">
                <p>{cardDetails.cardholderName || 'CARDHOLDER NAME'}</p>
                <p>{cardDetails.cardNumber || 'XXXX XXXX XXXX XXXX'}</p>
                <div className="card-details">
                <p>{cardDetails.expDate || 'MM/YY'}</p>
                <p>{cardDetails.cvv || 'CVV'}</p>
                </div>
            </div>
        </div>
            <form>
            <div className="form-group">
                <label>Cardholder Name</label>
                <input
                type="text" name="cardholderName" placeholder="Enter Cardholder Name" value={cardDetails.cardholderName}
                onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label>Card Number</label>
                <input
                type="text" name="cardNumber" placeholder="Enter Card Number" value={cardDetails.cardNumber}
                onChange={handleInputChange} />
            </div>
            <div className="form-group-row">
                <div className="form-group">
                <label>Exp Date</label>
                <input
                    type="text" name="expDate" placeholder="MM/YY" value={cardDetails.expDate} onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label>CVV</label>
                <input
                    type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleInputChange} />
                </div>
            </div>
            {/* <Link to='/successful-payment'>
                <button type="submit" className="confirm-button">Confirm</button>
            </Link> */}
            {/* <StripeCheckout
              token={onToken}
              stripeKey="pk_test_51PvYukIcyHoH5Xszeca5rNyDU2CaCnzOvKWagl1z2t3WWx5Y7MyclGyGTE0H0fHNPfbYv0EWnbsOJV4HiRWBhr1100gBUhPmUu"
              amount={totalAmount * 100} // Amount in cents
              name="Hotel Booking"
              description="Complete your booking"
            /> */}
            {/* </form> */}
        {/* </div> */}
        
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
