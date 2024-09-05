import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accommodationReducer from './accommodationSlice';
import favoritesSlice from './favoritesSlice';
import cartReducer from './cartSlice';
import bookingReducer from './bookingSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        accommodations: accommodationReducer,
        favorites: favoritesSlice,
        cart: cartReducer,
        booking: bookingReducer,
    },
});

export default store;
