import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalAmount: 0,
    bookingDetails: {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            if (item && item.price) {
                state.cartItems.push(item);
                state.totalAmount += item.price;
            } else {
                console.error('Invalid item or missing price:', item);
            }
        },
        updateBookingDetails: (state, action) => {
            const { checkInDate, checkOutDate, ...rest } = action.payload;
            state.bookingDetails = {
                ...rest,
                checkInDate: typeof checkInDate === 'string' ? checkInDate : new Date(checkInDate).toISOString(),
                checkOutDate: typeof checkOutDate === 'string' ? checkOutDate : new Date(checkOutDate).toISOString(),
            };
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.bookingDetails = {};
        },
    },
});

export const { addToCart, updateBookingDetails, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
