import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accommodationReducer from './accommodationSlice';
import favoritesSlice from './favoritesSlice';
import cartReducer from './cartSlice';
import bookingReducer from './bookingSlice'
import galleryReducer from './gallerySlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        accommodations: accommodationReducer,
        favorites: favoritesSlice,
        cart: cartReducer,
        booking: bookingReducer,
        gallery: galleryReducer,
    },
});

export default store;
