import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../redux/bookingSlice';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PvYukIcyHoH5Xszeca5rNyDU2CaCnzOvKWagl1z2t3WWx5Y7MyclGyGTE0H0fHNPfbYv0EWnbsOJV4HiRWBhr1100gBUhPmUu');

function CheckoutForm({ bookingDetails }) {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        });

        if (!error) {
        const booking = {
            ...bookingDetails,
            paymentMethodId: paymentMethod.id,
        };
        dispatch(addBooking(booking));
        navigate('/successful-payment')
        console.log(booking);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    )
}


const StripePayment = ({ bookingDetails }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm bookingDetails={bookingDetails} />
    </Elements>
);

export default StripePayment;