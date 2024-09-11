import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (userId) => {
    const q = query(collection(database, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('fetched', bookings)
    return bookings;
  }
);

export const addBooking = createAsyncThunk(
  'bookings/addBooking',
  async (booking) => {
    try {
      // Save the entire booking details to Firestore
      const docRef = await addDoc(collection(database, 'bookings'), booking);
      await addDoc(collection(database, 'receipts'), {
        bookingId: docRef.id,
        userId: booking.userId,
        amount: booking.amount,
        createdAt: new Date(),
      });
      return { id: docRef.id, ...booking }; // Return the full booking object with id
    } catch (error) {
      throw new Error(error.message); // Handle any errors
    }
  }
);


export const updateBookingRating = createAsyncThunk(
  'bookings/updateBookingRating',
  async ({ id, rating }) => {
    try {
      const bookingRef = doc(database, 'bookings', id);
      await updateDoc(bookingRef, { rating });
      return { id, rating };
    } catch (error) {
      throw new Error(error.message); // Handle any errors
    }
  }
);


export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review) => {
    await addDoc(collection(database, 'reviews'), review);
    return review;
  }
);


const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    reviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBookingRating.fulfilled, (state, action) => {
        const { id, rating } = action.payload;
        const booking = state.bookings.find(booking => booking.id === id);
        if (booking) {
          booking.rating = rating;
        }
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      })
      .addCase(updateBookingRating.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      });

  },
});

export default bookingSlice.reducer;
