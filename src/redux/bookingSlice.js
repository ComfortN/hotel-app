import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

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


// Fetch Reviews
// Fetch Reviews (all or user-specific based on userId)
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (userId = null) => {
    try {
      let q;
      if (userId) {
        // Fetch user-specific reviews
        q = query(collection(database, 'reviews'), where('userId', '==', userId));
      } else {
        // Fetch all reviews
        q = collection(database, 'reviews');
      }
      
      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return reviews;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


// Delete Review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId) => {
    try {
      await deleteDoc(doc(database, 'reviews', reviewId));
      return reviewId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Update Review
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async (review) => {
    try {
      const reviewRef = doc(database, 'reviews', review.id);
      await updateDoc(reviewRef, review);
      return review;
    } catch (error) {
      throw new Error(error.message);
    }
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
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = (action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      })
      .addCase(updateBookingRating.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message; // Handle errors
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.error = action.error.message; //Handle errors
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.error.message; //Handle errors
      });

  },
});

export default bookingSlice.reducer;
