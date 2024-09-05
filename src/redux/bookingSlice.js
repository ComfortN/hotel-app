import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../firebase/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (userId) => {
    const q = query(collection(database, 'bookings'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return bookings;
  }
);

export const addBooking = createAsyncThunk(
  'bookings/addBooking',
  async (booking) => {
    const docRef = await addDoc(collection(database, 'bookings'), booking);
    return { id: docRef.id, ...booking };
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
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
      });
  },
});

export default bookingSlice.reducer;
