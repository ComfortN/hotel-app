import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebase';

export const fetchGalleryImagesAsync = createAsyncThunk(
    'gallery/fetchGalleryImages',
    async () => {
        const querySnapshot = await getDocs(collection(database, 'gallery'));
        const galleryImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return galleryImages;
    }
);

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        images: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGalleryImagesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGalleryImagesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload;
            })
            .addCase(fetchGalleryImagesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default gallerySlice.reducer;
