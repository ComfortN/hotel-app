import React, {useState} from 'react';
import '../../styles/Checkout.css';
import Navbar from '../navbar/Navbar';
import Footer from '../foooter/Footer';

export default function Checkout() {
    const [cardDetails, setCardDetails] = useState({
        cardholderName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
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
                <input type="text" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter Last Name" />
              </div>
              <div className="form-group">
                <label>Phone No</label>
                <input type="text" placeholder="Enter Phone Number" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter Email" />
              </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Enter Address" />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="Enter City" />
            </div>
            <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" placeholder="Enter ZIP Code" />
            </div>
            <button type="submit" className="checkout-button">Checkout</button>
            </form>
        </div>

        <div className="order-summary">
            <h2>Your Cart</h2>
            <ul>
            <li>Item Name - R 1000</li>
            
            </ul>
            <div className="total">
            <p>Total: R 1000</p>
            </div>
        </div>

        
    </div>

    <div className="payment-container">
        <h2>Payment Details</h2>
        <div className='card-payment'>
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
            <button type="submit" className="confirm-button">Confirm</button>
            </form>
        </div>
        
        </div>

    <Footer />
</div>
)
}
