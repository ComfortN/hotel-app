import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { addBooking } from '../../redux/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { database } from '../../firebase/firebase';

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

        if (error) {
            console.error('Error creating payment method:', error);
        } else {
            const paymentMethodId = paymentMethod.id;

            const bookingData = {
                ...bookingDetails,
                paymentMethodId,
                amount: bookingDetails.totalAmount,
                createdAt: new Date(),
            };

            try {
                const docRef = await addDoc(collection(database, 'receipts'), bookingData);
                const receiptId = docRef.id;

                dispatch(addBooking({ ...bookingData, id: receiptId }));

                navigate(`/payment-success/${receiptId}`);
            } catch (error) {
                console.error('Error saving booking data:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
}

const StripePayment = ({ bookingDetails }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm bookingDetails={bookingDetails} />
    </Elements>
);

export default StripePayment;
