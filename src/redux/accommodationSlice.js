import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAccommodations } from '../firebase/accommodations';

export const fetchAccommodationsAsync = createAsyncThunk(
    'accommodations/fetchAccommodations',
    async () => {
        const accommodations = await fetchAccommodations();
        return accommodations;
    }
    );

    const accommodationsSlice = createSlice({
    name: 'accommodations',
    initialState: {
        accommodations: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAccommodationsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAccommodationsAsync.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.accommodations = action.payload;
        })
        .addCase(fetchAccommodationsAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default accommodationsSlice.reducer;
