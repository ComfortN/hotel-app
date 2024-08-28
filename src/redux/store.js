import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accommodationReducer from './accommodationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        accommodations: accommodationReducer,
    },
});

export default store;
